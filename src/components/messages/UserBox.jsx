import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../helper/apis";

const UserBox = ({ con, userId, token, setCurrentChat }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchFriendInfo = async () => {
      const friendId = con.members.find((m) => m !== userId);
      try {
        const friend = await getUserInfo(token, friendId);
        setUser(friend);
      } catch (error) {
        console.error("Error fetching friend info:", error);
      }
    };

    if (userId && con) {
      fetchFriendInfo(); 
    }
  }, [userId, con]);

  return (
    <div className="messages-user" onClick={() => setCurrentChat(con)}>
      <div className="messages-user-img">
        <img src={user?.profileUrl} alt="profile-pic" />
        <div className="messages-user-titles">
          <span className="messages-user-name">{user?.fullName}</span>
          <span className="messages-user-headline">
            {user?.headline || "WeLynks User"}
          </span>
        </div>
      </div>
      <div className="messages-user-time">
        <span>09:29 AM</span>
      </div>
    </div>
  );
};

export default UserBox;
