import React, { useEffect, useRef } from "react";
import moment from "moment";

const MessagesChatbox = ({
  messages,
  userId,
  newMessage,
  setNewMessage,
  handleSubmit,
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
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
              alt="user-pic"
            />
            <div className="chatbox-top-names">
              <span className="chatbox-top-name">Suneel Mekala</span>
              <span className="chatbox-top-headline">Fullstack Developer</span>
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
          {/* <div className="chatbox-middle-date">
            <span className="box-shadow">Yesterday</span>
          </div> */}

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
        </div>

        <div className="messages-chatbox-bottom box-shadow">
          <div className="chatbox-bottom-icons">
            <div className="chatbox-bottom-icon">
              <i className="fa-regular fa-face-smile"></i>
            </div>
            <div className="chatbox-bottom-icon">
              <i className="fa fa-plus"></i>
            </div>
          </div>
          <input
            type="text"
            placeholder="What's app buddy!"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <div className="chatbox-bottom-icon" onClick={handleSubmit}>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesChatbox;
