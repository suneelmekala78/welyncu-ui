import React, { useEffect, useRef, useState } from "react";
import MessagesUsers from "./MessagesUsers";
import MessagesChatbox from "./MessagesChatbox";
import { getConversations, getMessages, sendMessage } from "../../helper/apis";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const MessagesLeft = () => {
  const { token, user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);

      // setOnlineUsers(
      //   currentUser?.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);

  const Conversations = async () => {
    try {
      const res = await getConversations(token, user?._id);
      setConversations(res?.conversation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const allMessages = async () => {
      try {
        const res = await getMessages(token, currentChat?._id);
        setMessages(res?.messages);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    allMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        sender: user?._id,
        text: newMessage,
        conversationId: currentChat?._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user?._id
      );

      socket.current.emit("sendMessage", {
        senderId: user?._id,
        receiverId,
        text: newMessage,
      });

      const res = await sendMessage(token, data);
      setMessages([...messages, res.savedMessage]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Conversations();
  }, [user]);

  return (
    <div className="messages-left-section box-shadow">
      <h2 className="messages-left-top-title">Messaging</h2>
      <div className="messages-left-flex">
        <div className="messages-left-users">
          <MessagesUsers
            conversations={conversations}
            userId={user?._id}
            token={token}
            setCurrentChat={setCurrentChat}
          />
        </div>
        <div className="messages-left-chatbox">
          {currentChat ? (
            <MessagesChatbox 
              currentChat={currentChat}
              messages={messages}
              userId={user?._id}
              setMessages={setMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSubmit={handleSubmit}
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
