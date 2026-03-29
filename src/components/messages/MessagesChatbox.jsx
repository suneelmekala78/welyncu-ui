import React, { useEffect, useRef } from "react";
import moment from "moment";

const MessagesChatbox = ({
  currentChatUser,
  messages,
  isMessagesLoading,
  isTyping,
  isRecipientOnline,
  userId,
  newMessage,
  onTyping,
  handleSubmit,
  showBackButton,
  onBack,
}) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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

          {messages?.map((mess, index) => (
            <div
              className="message-container"
              ref={index === messages.length - 1 ? scrollRef : null}
              key={index}
            >
              <div
                className={
                  mess?.sender === userId
                    ? "my-message box-shadow"
                    : "user-message box-shadow"
                }
              >
                {/* <img
                  src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
                  alt="user-pic"
                /> */}
                <div
                  className={
                    mess?.sender === userId
                      ? "my-message-text"
                      : "user-message-text"
                  }
                >
                  <span>{mess?.text}</span>
                  <span className="text-time">
                    {moment(mess?.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          ))}

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

        <div className="messages-chatbox-bottom box-shadow">
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
                ? "chatbox-bottom-icon"
                : "chatbox-bottom-icon chatbox-bottom-icon-disabled"
            }
            onClick={handleSubmit}
          >
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesChatbox;
