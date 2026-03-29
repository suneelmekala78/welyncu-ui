import React from "react";
import UserBox from "./UserBox";

const MessagesUsers = ({
  conversations,
  userId,
  currentChatId,
  onlineUsers,
  setCurrentChat,
  setCurrentChatUser,
}) => {
  
  return (
    <div className="messages-users-section">
      <div className="messages-users-search"> 
        <div className="messages-users-search-input">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search users" />
        </div>
      </div>
      <div className="messages-users">
        {conversations?.length > 0 ? (
          conversations?.map((con, index) => (
            <UserBox
              con={con}
              userId={userId}
              key={index}
              isOnline={onlineUsers?.includes(
                con?.members?.find((member) => member !== userId)
              )}
              isActive={currentChatId === con?._id}
              setCurrentChat={setCurrentChat}
              setCurrentChatUser={setCurrentChatUser}
            />
          ))
        ) : (
          <span className="no-users">No Chats</span>
        )}
      </div>
    </div>
  );
};

export default MessagesUsers;
