import React from "react";
import "../components/messages/messages.css";
import MessagesLeft from "../components/messages/MessagesLeft";
// import MessagesRight from "../components/messages/MessagesRight";
import TopNav from "../components/topnav/TopNav";

const Messages = () => {
  
  return (
    <>
    <TopNav/>
    <div className="messages-page">
      {/* <div className="messages-left"> */}
        <MessagesLeft />
      {/* </div> */}
      {/* <div className="messages-right">
        <MessagesRight />
      </div> */}
    </div></>
  );
};

export default Messages;
