import React, { useEffect, useRef, useState } from "react";
import MessagesUsers from "./MessagesUsers";
import MessagesChatbox from "./MessagesChatbox";
import {
  createConversation,
  getConversations,
  getMessages,
  sendMessage,
  sendMessageWithMedia,
} from "../../helper/apis";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const dedupeConversations = (allConversations = []) => {
  const unique = new Map();

  allConversations.forEach((conversation) => {
    const key = [...(conversation?.members || [])].sort().join("_");

    if (!key) return;

    const existing = unique.get(key);

    if (!existing) {
      unique.set(key, conversation);
      return;
    }

    const existingTime = new Date(existing?.updatedAt || existing?.createdAt || 0).getTime();
    const currentTime = new Date(conversation?.updatedAt || conversation?.createdAt || 0).getTime();

    if (currentTime >= existingTime) {
      unique.set(key, conversation);
    }
  });

  return Array.from(unique.values());
};

const MessagesLeft = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [isConversationsLoaded, setIsConversationsLoaded] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUserId, setTypingUserId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const typingTimeoutRef = useRef();
  const currentChatRef = useRef(null);
  const socket = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:8900";
    socket.current = io(socketUrl);

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        _id: data._id,
        sender: data.senderId,
        text: data.text,
        mediaUrl: data.mediaUrl,
        mediaType: data.mediaType,
        createdAt: Date.now(),
      });
    });

    // Real-time message edit
    socket.current.on("messageEdited", ({ messageId, text }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId ? { ...m, text, isEdited: true } : m
        )
      );
    });

    // Real-time message delete
    socket.current.on("messageDeleted", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId ? { ...m, text: "", isDeleted: true, mediaUrl: null } : m
        )
      );
    });

    // Real-time message reaction
    socket.current.on("messageReaction", ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId ? { ...m, reactions } : m
        )
      );
    });

    socket.current.on("typing", ({ senderId }) => {
      if (currentChatRef.current?.members?.includes(senderId)) {
        setTypingUserId(senderId);
      }
    });

    socket.current.on("stopTyping", ({ senderId }) => {
      setTypingUserId((prev) => (prev === senderId ? "" : prev));
    });

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socket.current?.off("getMessage");
      socket.current?.off("messageEdited");
      socket.current?.off("messageDeleted");
      socket.current?.off("messageReaction");
      socket.current?.off("typing");
      socket.current?.off("stopTyping");
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (!user?._id || !socket.current) return;

    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users?.map((connectedUser) => connectedUser?.userId));
    });

    return () => socket.current?.off("getUsers");
  }, [user]);

  const Conversations = async () => {
    try {
      const res = await getConversations(user?._id, dispatch);
      setConversations(dedupeConversations(res?.conversation));
    } catch (error) {
      console.log(error);
    } finally {
      setIsConversationsLoaded(true);
    }
  };

  useEffect(() => {
    const targetUserId = location?.state?.targetUserId;
    const targetUser = location?.state?.targetUser;

    if (!targetUserId || !user?._id || !isConversationsLoaded) return;

    const existingConversation = conversations.find((conversation) =>
      conversation?.members?.includes(targetUserId)
    );

    if (existingConversation) {
      setCurrentChat(existingConversation);
      if (targetUser?._id === targetUserId) {
        setCurrentChatUser(targetUser);
      }
      return;
    }

    const openConversation = async () => {
      const res = await createConversation(
        {
          senderId: user?._id,
          receiverId: targetUserId,
        },
        dispatch
      );

      const savedConversation = res?.savedConversation;

      if (savedConversation?._id) {
        setConversations((prev) =>
          dedupeConversations([...prev, savedConversation])
        );
        setCurrentChat(savedConversation);
        if (targetUser?._id === targetUserId) {
          setCurrentChatUser(targetUser);
        }
      }
    };

    openConversation();
  }, [conversations, dispatch, isConversationsLoaded, location?.state, user?._id]);

  useEffect(() => {
    if (!currentChat?._id) {
      setMessages([]);
      setTypingUserId("");
      return;
    }

    const allMessages = async () => {
      try {
        setIsMessagesLoading(true);
        const res = await getMessages(currentChat?._id, dispatch);
        setMessages(res?.messages);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsMessagesLoading(false);
      }
    };

    allMessages();
  }, [currentChat, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !currentChat?._id || !user?._id) return;

    try {
      const data = {
        sender: user?._id,
        text: newMessage.trim(),
        conversationId: currentChat?._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user?._id
      );

      const res = await sendMessage(data, dispatch);

      socket.current.emit("sendMessage", {
        senderId: user?._id,
        receiverId,
        text: newMessage.trim(),
        _id: res?.savedMessage?._id,
      });

      socket.current.emit("stopTyping", {
        senderId: user?._id,
        receiverId,
      });

      setMessages((prev) => [...prev, res.savedMessage]);
      setNewMessage("");
      setTypingUserId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMediaSubmit = async (file) => {
    if (!file || !currentChat?._id || !user?._id) return;
    try {
      const formData = new FormData();
      formData.append("media", file);
      formData.append("sender", user?._id);
      formData.append("conversationId", currentChat?._id);

      const res = await sendMessageWithMedia(formData, dispatch);
      if (res?.status === "success") {
        const receiverId = currentChat.members.find((m) => m !== user?._id);
        socket.current.emit("sendMessage", {
          senderId: user?._id,
          receiverId,
          text: res.savedMessage.text,
          mediaUrl: res.savedMessage.mediaUrl,
          mediaType: res.savedMessage.mediaType,
          _id: res.savedMessage._id,
        });
        setMessages((prev) => [...prev, res.savedMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTyping = (value) => {
    setNewMessage(value);

    if (!socket.current || !currentChat || !user?._id) return;

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    if (!receiverId) return;

    socket.current.emit("typing", {
      senderId: user?._id,
      receiverId,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.current.emit("stopTyping", {
        senderId: user?._id,
        receiverId,
      });
    }, 1000);
  };

  useEffect(() => {
    if (user?._id) {
      Conversations();
    }
  }, [user, dispatch]);

  const handleBackToConversationList = () => {
    setCurrentChat(null);
    setCurrentChatUser(null);
    setMessages([]);
    setTypingUserId("");
    setNewMessage("");
  };

  const showUsersPane = !isMobileView || !currentChat;
  const showChatPane = !isMobileView || Boolean(currentChat);

  return (
    <div className="messages-left-section box-shadow">
      <h2 className="messages-left-top-title">Messaging</h2>
      <div className="messages-left-flex">
        <div
          className={
            showUsersPane
              ? "messages-left-users"
              : "messages-left-users messages-mobile-hidden"
          }
        >
          <MessagesUsers
            conversations={conversations}
            userId={user?._id}
            currentChatId={currentChat?._id}
            onlineUsers={onlineUsers}
            setCurrentChat={setCurrentChat}
            setCurrentChatUser={setCurrentChatUser}
          />
        </div>
        <div
          className={
            showChatPane
              ? "messages-left-chatbox"
              : "messages-left-chatbox messages-mobile-hidden"
          }
        >
          {currentChat ? (
            <MessagesChatbox 
              currentChat={currentChat}
              currentChatUser={currentChatUser}
              messages={messages}
              setMessages={setMessages}
              isMessagesLoading={isMessagesLoading}
              isTyping={Boolean(
                typingUserId &&
                  currentChatUser?._id &&
                  typingUserId === currentChatUser?._id
              )}
              isRecipientOnline={onlineUsers?.includes(currentChatUser?._id)}
              userId={user?._id}
              newMessage={newMessage}
              onTyping={handleTyping}
              handleSubmit={handleSubmit}
              handleMediaSubmit={handleMediaSubmit}
              showBackButton={isMobileView}
              onBack={handleBackToConversationList}
              socket={socket}
            />
          ) : (
            <div className="select-chat-section">
              <span>Click on a chat to start conversation</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesLeft;
