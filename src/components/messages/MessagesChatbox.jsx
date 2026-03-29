import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  editMessageApi,
  deleteMessageApi,
  deleteMessageForMeApi,
  reactToMessageApi,
} from "../../helper/apis";
// eslint-disable-next-line no-unused-vars
import { toast } from "react-toastify";

const QUICK_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "😡", "🔥", "👏"];

const EMOJI_CATEGORIES = {
  "Smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤗", "🤭", "🤫", "🤔", "🫡", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷"],
  "Gestures": ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🙏", "💪"],
  "Hearts": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "💕", "💞", "💓", "💗", "💖", "💝", "💘"],
  "Objects": ["🔥", "⭐", "🌟", "✨", "💯", "💥", "🎉", "🎊", "🏆", "🎯", "💡", "📎", "📌", "🔔", "🎵", "🎶"],
};

const MessagesChatbox = ({
  currentChat,
  currentChatUser,
  messages,
  setMessages,
  isMessagesLoading,
  isTyping,
  isRecipientOnline,
  userId,
  newMessage,
  onTyping,
  handleSubmit,
  handleMediaSubmit,
  showBackButton,
  onBack,
  socket,
}) => {
  const scrollRef = useRef();
  const fileInputRef = useRef(null);
  const [contextMenu, setContextMenu] = useState(null); // { messageId, x, y }
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReactPicker, setShowReactPicker] = useState(null); // messageId
  const [emojiCategory, setEmojiCategory] = useState("Smileys");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deletePopup, setDeletePopup] = useState(null); // { msgId, isMine }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close context menu on click outside
  useEffect(() => {
    const close = () => { setContextMenu(null); setShowReactPicker(null); };
    if (contextMenu || showReactPicker) {
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [contextMenu, showReactPicker]);

  // Close delete popup on Escape
  useEffect(() => {
    if (!deletePopup) return;
    const handleKey = (e) => { if (e.key === "Escape") setDeletePopup(null); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [deletePopup]);

  const handleContextMenu = (e, msg) => {
    e.preventDefault();
    setContextMenu({ messageId: msg._id, x: e.clientX, y: e.clientY, msg });
  };

  const handleEdit = (msg) => {
    setEditingId(msg._id);
    setEditText(msg.text);
    setContextMenu(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editText.trim() || !editingId) return;
    const res = await editMessageApi(editingId, editText.trim());
    if (res?.status === "success") {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === editingId ? { ...m, text: editText.trim(), isEdited: true } : m
        )
      );
      // Notify via socket
      const receiverId = currentChat?.members?.find((m) => m !== userId);
      if (socket?.current && receiverId) {
        socket.current.emit("messageEdited", {
          receiverId,
          messageId: editingId,
          text: editText.trim(),
        });
      }
      setEditingId(null);
      setEditText("");
    }
  };

  const handleDelete = async (msgId) => {
    setContextMenu(null);
    setDeletePopup(null);
    const res = await deleteMessageApi(msgId);
    if (res?.status === "success") {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === msgId ? { ...m, text: "", isDeleted: true, mediaUrl: null } : m
        )
      );
      const receiverId = currentChat?.members?.find((m) => m !== userId);
      if (socket?.current && receiverId) {
        socket.current.emit("messageDeleted", { receiverId, messageId: msgId });
      }
    }
  };

  const handleDeleteForMe = async (msgId) => {
    setContextMenu(null);
    setDeletePopup(null);
    const res = await deleteMessageForMeApi(msgId);
    if (res?.status === "success") {
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
    }
  };

  const openDeletePopup = (msgId, isMine) => {
    setContextMenu(null);
    setDeletePopup({ msgId, isMine });
  };

  const handleReact = async (msgId, emoji) => {
    setShowReactPicker(null);
    setContextMenu(null);
    const res = await reactToMessageApi(msgId, emoji);
    if (res?.status === "success") {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === msgId ? { ...m, reactions: res.updatedMessage.reactions } : m
        )
      );
      const receiverId = currentChat?.members?.find((m) => m !== userId);
      if (socket?.current && receiverId) {
        socket.current.emit("messageReaction", {
          receiverId,
          messageId: msgId,
          reactions: res.updatedMessage.reactions,
        });
      }
    }
  };

  const handleEmojiInsert = (emoji) => {
    onTyping(newMessage + emoji);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      setMediaPreview(URL.createObjectURL(file));
    } else {
      setMediaPreview(null);
    }
  };

  const handleSendMedia = () => {
    if (!selectedFile) return;
    handleMediaSubmit(selectedFile);
    setSelectedFile(null);
    setMediaPreview(null);
  };

  const cancelMediaPreview = () => {
    setSelectedFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const groupReactions = (reactions) => {
    if (!reactions || reactions.length === 0) return [];
    const map = {};
    reactions.forEach((r) => {
      if (!map[r.emoji]) map[r.emoji] = { emoji: r.emoji, count: 0, users: [] };
      map[r.emoji].count++;
      map[r.emoji].users.push(r.user);
    });
    return Object.values(map);
  };

  return (
    <>
      <div className="messages-chatbox-section">
        <div className="messages-chatbox-top box-shadow">
          <div className="chatbox-top-left">
            {showBackButton && (
              <button className="chatbox-back-btn" onClick={onBack}>
                <i className="fa fa-arrow-left"></i>
              </button>
            )}
            <img
              src={
                currentChatUser?.profileUrl ||
                "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
              }
              alt="user-pic"
            />
            <div className="chatbox-top-names">
              <span className="chatbox-top-name">
                {currentChatUser?.fullName || "Select a conversation"}
              </span>
              <span className="chatbox-top-headline">
                {isTyping
                  ? "typing..."
                  : isRecipientOnline
                  ? "Online"
                  : currentChatUser?.headline || "Offline"}
              </span>
            </div>
          </div>
          <div className="chatbox-top-right">
            <div className="chatbox-top-icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="chatbox-top-icon">
              <i className="fa fa-video"></i>
            </div>
            <div className="chatbox-top-icon">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>

        <div className="messages-chatbox-middle">
          {isMessagesLoading && (
            <div className="messages-chat-empty">Loading messages...</div>
          )}

          {!isMessagesLoading && messages?.length === 0 && (
            <div className="messages-chat-empty">
              No messages yet. Start the conversation.
            </div>
          )}

          {messages?.map((mess, index) => {
            const isMine = mess?.sender === userId;
            const reactions = groupReactions(mess?.reactions);

            return (
              <div
                className="message-container"
                ref={index === messages.length - 1 ? scrollRef : null}
                key={mess?._id || index}
              >
                <div
                  className={isMine ? "my-message box-shadow" : "user-message box-shadow"}
                  onContextMenu={(e) => !mess?.isDeleted && handleContextMenu(e, mess)}
                >
                  {mess?.isDeleted ? (
                    <div className={isMine ? "my-message-text" : "user-message-text"}>
                      <span className="msg-deleted-text">
                        <i className="fa fa-ban"></i> This message was deleted
                      </span>
                    </div>
                  ) : editingId === mess?._id ? (
                    <form className="msg-edit-form" onSubmit={handleEditSubmit}>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                      <div className="msg-edit-actions">
                        <button type="submit"><i className="fa fa-check"></i></button>
                        <button type="button" onClick={() => setEditingId(null)}>
                          <i className="fa fa-xmark"></i>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className={isMine ? "my-message-text" : "user-message-text"}>
                      {/* Media content */}
                      {mess?.mediaUrl && (
                        <div className="msg-media">
                          {mess.mediaType === "image" ? (
                            <img src={mess.mediaUrl} alt="shared" className="msg-media-img" />
                          ) : mess.mediaType === "video" ? (
                            <video controls className="msg-media-video">
                              <source src={mess.mediaUrl} />
                            </video>
                          ) : (
                            <a
                              href={mess.mediaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="msg-media-file"
                            >
                              <i className="fa fa-file"></i> File
                            </a>
                          )}
                        </div>
                      )}
                      {mess?.text && <span>{mess.text}</span>}
                      <div className="msg-meta">
                        <span className="text-time">
                          {moment(mess?.createdAt).fromNow()}
                        </span>
                        {mess?.isEdited && <span className="msg-edited-badge">edited</span>}
                      </div>
                    </div>
                  )}

                  {/* Quick react on hover */}
                  {!mess?.isDeleted && !editingId && (
                    <div className="msg-hover-actions">
                      <i
                        className="fa fa-face-smile"
                        onClick={(e) => { e.stopPropagation(); setShowReactPicker(mess?._id); }}
                      ></i>
                      {isMine && (
                        <>
                          <i className="fa fa-pen" onClick={() => handleEdit(mess)}></i>
                          <i className="fa fa-trash" onClick={() => openDeletePopup(mess?._id, true)}></i>
                        </>
                      )}
                      {!isMine && (
                        <i className="fa fa-trash" onClick={() => openDeletePopup(mess?._id, false)}></i>
                      )}
                    </div>
                  )}
                </div>

                {/* Reactions display */}
                {reactions.length > 0 && !mess?.isDeleted && (
                  <div className={`msg-reactions-row ${isMine ? "msg-reactions-right" : "msg-reactions-left"}`}>
                    {reactions.map((r, i) => (
                      <span
                        key={i}
                        className={`msg-reaction-chip ${r.users.includes(userId) ? "msg-reaction-mine" : ""}`}
                        onClick={() => handleReact(mess._id, r.emoji)}
                      >
                        {r.emoji} {r.count > 1 && <small>{r.count}</small>}
                      </span>
                    ))}
                  </div>
                )}

                {/* React picker dropdown */}
                {showReactPicker === mess?._id && (
                  <div className={`msg-react-picker ${isMine ? "msg-react-picker-right" : "msg-react-picker-left"}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {QUICK_EMOJIS.map((emoji) => (
                      <span key={emoji} onClick={() => handleReact(mess._id, emoji)}>
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="message-container typing-wrap">
              <div className="typing-indicator box-shadow">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {/* Media preview bar */}
        {selectedFile && (
          <div className="msg-media-preview-bar">
            {mediaPreview ? (
              <img src={mediaPreview} alt="preview" className="msg-media-preview-thumb" />
            ) : (
              <div className="msg-media-preview-file">
                <i className="fa fa-file"></i>
                <span>{selectedFile.name}</span>
              </div>
            )}
            <div className="msg-media-preview-actions">
              <button onClick={handleSendMedia} className="msg-media-send-btn">
                <i className="fa fa-paper-plane"></i> Send
              </button>
              <button onClick={cancelMediaPreview} className="msg-media-cancel-btn">
                <i className="fa fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        <div className="messages-chatbox-bottom box-shadow">
          {/* Emoji picker toggle */}
          <div
            className="chatbox-bottom-icon chatbox-emoji-toggle"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <i className="fa-regular fa-face-smile"></i>
          </div>

          {/* Media upload */}
          <div
            className="chatbox-bottom-icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <i className="fa fa-paperclip"></i>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />

          <form className="messages-chatbox-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              onChange={(e) => onTyping(e.target.value)}
              value={newMessage}
            />
          </form>
          <div
            className={
              newMessage?.trim()
                ? "chatbox-bottom-icon chatbox-send-btn"
                : "chatbox-bottom-icon chatbox-send-btn chatbox-bottom-icon-disabled"
            }
            onClick={handleSubmit}
          >
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>

        {/* Emoji picker panel */}
        {showEmojiPicker && (
          <div className="emoji-picker-panel" onClick={(e) => e.stopPropagation()}>
            <div className="emoji-picker-header">
              {Object.keys(EMOJI_CATEGORIES).map((cat) => (
                <span
                  key={cat}
                  className={`emoji-cat-tab ${emojiCategory === cat ? "emoji-cat-active" : ""}`}
                  onClick={() => setEmojiCategory(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="emoji-picker-grid">
              {EMOJI_CATEGORIES[emojiCategory]?.map((emoji, i) => (
                <span
                  key={i}
                  className="emoji-picker-item"
                  onClick={() => handleEmojiInsert(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Context menu */}
        {contextMenu && (
          <div
            className="msg-context-menu box-shadow"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="msg-context-item"
              onClick={() => { setShowReactPicker(contextMenu.messageId); setContextMenu(null); }}
            >
              <i className="fa fa-face-smile"></i> React
            </div>
            {contextMenu.msg?.sender === userId && (
              <>
                <div className="msg-context-item" onClick={() => handleEdit(contextMenu.msg)}>
                  <i className="fa fa-pen"></i> Edit
                </div>
                <div
                  className="msg-context-item msg-context-danger"
                  onClick={() => openDeletePopup(contextMenu.messageId, true)}
                >
                  <i className="fa fa-trash"></i> Delete
                </div>
              </>
            )}
            {contextMenu.msg?.sender !== userId && (
              <div
                className="msg-context-item msg-context-danger"
                onClick={() => openDeletePopup(contextMenu.messageId, false)}
              >
                <i className="fa fa-trash"></i> Delete
              </div>
            )}
          </div>
        )}
        {/* Delete confirmation popup */}
        {deletePopup && (
          <div className="msg-delete-overlay" onClick={() => setDeletePopup(null)}>
            <div className="msg-delete-popup box-shadow" onClick={(e) => e.stopPropagation()}>
              <div className="msg-delete-popup-title">Delete message?</div>
              <div className="msg-delete-popup-actions">
                <button
                  className="msg-delete-btn msg-delete-forme"
                  onClick={() => handleDeleteForMe(deletePopup.msgId)}
                >
                  <i className="fa fa-eye-slash"></i> Delete for me
                </button>
                {deletePopup.isMine && (
                  <button
                    className="msg-delete-btn msg-delete-everyone"
                    onClick={() => handleDelete(deletePopup.msgId)}
                  >
                    <i className="fa fa-trash"></i> Delete for everyone
                  </button>
                )}
                <button
                  className="msg-delete-btn msg-delete-cancel"
                  onClick={() => setDeletePopup(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessagesChatbox;
