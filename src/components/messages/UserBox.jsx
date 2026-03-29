import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../helper/apis";
import { useDispatch } from "react-redux";

const UserBox = ({
  con,
  userId,
  isOnline,
  isActive,
  setCurrentChat,
  setCurrentChatUser,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchFriendInfo = async () => {
      const friendId = con.members.find((m) => m !== userId);
      try {
        const friend = await getUserInfo(friendId, dispatch);
        setUser(friend);
      } catch (error) {
        console.error("Error fetching friend info:", error);
      }
    };

    if (userId && con) {
      fetchFriendInfo(); 
    }
  }, [userId, con]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectChat = () => {
    setCurrentChat(con);
    setCurrentChatUser(user);
  };

  return (
    <div
      className={isActive ? "messages-user messages-user-active" : "messages-user"}
      onClick={handleSelectChat}
    >
      <div className="messages-user-img">
        <img src={user?.profileUrl} alt="profile-pic" />
        <span
          className={
            isOnline
              ? "messages-user-online-status"
              : "messages-user-offline-status"
          }
        ></span>
        <div className="messages-user-titles">
          <span className="messages-user-name">{user?.fullName}</span>
          <span className="messages-user-headline">
            {user?.headline || "WeLynks User"}
          </span>
        </div>
      </div>
      <div className="messages-user-time">
        <span>{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};

export default UserBox;
