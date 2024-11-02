import React, { useEffect, useRef, useState } from "react";
import "./games.css";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const InviteFriend = ({ setInvite }) => {
  const { userId } = useSelector((state) => state.user);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [betCoins, setBetCoins] = useState(1);
  const [rounds, setRounds] = useState(3);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8900");

    // Emit the user's socket connection with their ID
    socket.current.emit("addUser", userId);

    // Fetch online friends
    socket.current.emit("getOnlineFriends", { userId });

    socket.current.on("onlineFriends", (data) => {
      setOnlineFriends(data.onlineFriends);
      console.log(data.onlineFriends);
    });

    return () => {
      socket.current.off("onlineFriends");
    };
  }, [userId]);

  const handleFriendSelection = (friendId) => {
    setSelectedFriend(friendId);
  };

  const inviteFriend = () => {
    if (!selectedFriend || betCoins <= 0 || rounds % 2 === 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    // Assume we have a function to get the friend's socket ID
    const friendSocketId = onlineFriends.find((friend) => friend._id === selectedFriend)?.socketId;

    if (!friendSocketId) {
      alert("Selected friend is not online.");
      return;
    }

    const gameId = `game-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique game ID

    socket.current.emit("inviteFriend", {
      friendSocketId,
      inviter: userId,
      gameId,
    });

    alert("Invitation sent!");
    setInvite(false); // Close the invite popup after sending
  };

  return (
    <div className="popup-section popup-section-active">
      <div className="popup-container box-shadow p-15">
        <i className="fa fa-xmark" onClick={() => setInvite(false)}></i>
        <div className="invite-friend-popup profile-top-details-edit-section">
          <div className="profile-top-details-edit-top">
            <div className="edit-top-title">Invite Friend</div>
          </div>

          <div className="personal-input">
            <label htmlFor="coins">Bet coins</label>
            <input
              type="number"
              id="coins"
              value={betCoins}
              onChange={(e) => setBetCoins(Number(e.target.value))}
            />
          </div>
          <div className="personal-input">
            <label htmlFor="rounds">Rounds</label>
            <input
              type="number"
              id="rounds"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
            />
          </div>

          <div className="personal-input">
            <label htmlFor="friend">Invite Friend</label>
            <input
              type="text"
              id="friend"
              placeholder="Search your friend here..."
              value={selectedFriend}
              readOnly // Make it readOnly as we have a list below
            />
          </div>

          <div className="all-friends-sec">
            {onlineFriends.map((friend) => (
              <div
                key={friend._id}
                className="inv-friend cp"
                onClick={() => handleFriendSelection(friend._id)}
              >
                <div className="inv-friend-left">
                  <img
                    src={friend.profilePicture || "default-image-url"} // Replace with actual image URL
                    alt={friend.name}
                  />
                  <div className="inv-friend-left-details">
                    <b>{friend.name}</b>
                    <span>{friend.role}</span> {/* Replace with friend's role */}
                  </div>
                </div>
                <div className="inv-friend-right">
                  <input
                    type="checkbox"
                    checked={selectedFriend === friend._id}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="invite-button" onClick={inviteFriend}>
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;
