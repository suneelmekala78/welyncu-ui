import React, { useEffect, useState } from "react";
import "./games.css";
import { useSelector } from "react-redux";
import { getConnectionsList, createGameApi } from "../../helper/apis";
import { toast } from "react-toastify";

const InviteFriend = ({ onClose, gameType, socket, onGameCreated }) => {
  const { user } = useSelector((state) => state.user);
  const [connections, setConnections] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [betCoins, setBetCoins] = useState(5);
  const [rounds, setRounds] = useState(3);
  const [quizCategory, setQuizCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      const res = await getConnectionsList();
      if (res?.status === "success") {
        setConnections(res.connections || []);
      }
    };
    fetchConnections();
  }, []);

  const filteredConnections = connections.filter((c) =>
    c?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = async () => {
    if (!selectedFriend) {
      toast.error("Please select a friend to invite");
      return;
    }
    if (betCoins < 0) {
      toast.error("Bet coins cannot be negative");
      return;
    }
    if ((gameType === "tictactoe" || gameType === "rps") && rounds % 2 === 0) {
      toast.error("Rounds must be an odd number");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createGameApi({
        friendId: selectedFriend._id,
        gameType,
        betCoins,
        rounds: (gameType === "tictactoe" || gameType === "rps") ? rounds : 1,
        quizCategory: gameType === "quiz" ? quizCategory : undefined,
      });

      if (res?.status === "success") {
        toast.success("Game invitation sent!");
        // Notify via socket
        if (socket) {
          socket.emit("gameInvite", {
            receiverId: selectedFriend._id,
            gameId: res.game._id,
            gameType,
            inviterName: user?.fullName,
            inviterId: user?._id,
            betCoins,
          });
        }
        if (onGameCreated) onGameCreated(res.game);
        onClose();
      } else {
        toast.error(res?.message || "Failed to create game");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating game");
    } finally {
      setIsSubmitting(false);
    }
  };

  const gameLabels = {
    tictactoe: "Tic Tac Toe",
    chess: "Chess",
    quiz: "Quiz",
    connect4: "Connect 4",
    rps: "Rock Paper Scissors",
    mathbattle: "Math Battle",
  };

  return (
    <div className="game-invite-overlay" onClick={onClose}>
      <div className="game-invite-modal" onClick={(e) => e.stopPropagation()}>
        <div className="game-invite-header">
          <h3>Invite to {gameLabels[gameType] || "Game"}</h3>
          <i className="fa fa-xmark" onClick={onClose}></i>
        </div>

        <div className="game-invite-body">
          <div className="game-invite-field">
            <label>
              <i className="fa fa-coins"></i> Bet Coins (Your balance: {user?.coins || 0})
            </label>
            <input
              type="number"
              min="0"
              max={user?.coins || 0}
              value={betCoins}
              onChange={(e) => setBetCoins(Math.max(0, Number(e.target.value)))}
            />
          </div>

          {(gameType === "tictactoe" || gameType === "rps") && (
            <div className="game-invite-field">
              <label>Rounds (odd number)</label>
              <select value={rounds} onChange={(e) => setRounds(Number(e.target.value))}>
                <option value={1}>1 Round</option>
                <option value={3}>3 Rounds</option>
                <option value={5}>5 Rounds</option>
                <option value={7}>7 Rounds</option>
              </select>
            </div>
          )}

          {gameType === "quiz" && (
            <div className="game-invite-field">
              <label>Category</label>
              <select value={quizCategory} onChange={(e) => setQuizCategory(e.target.value)}>
                <option value="general">General Knowledge</option>
                <option value="tech">Technology</option>
                <option value="science">Science</option>
              </select>
            </div>
          )}

          <div className="game-invite-field">
            <label>Select a Connection</label>
            <input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="connection-list">
            {filteredConnections.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                {connections.length === 0 ? "No connections yet" : "No match found"}
              </div>
            ) : (
              filteredConnections.map((conn) => (
                <div
                  key={conn._id}
                  className={`connection-item ${selectedFriend?._id === conn._id ? "selected" : ""}`}
                  onClick={() => setSelectedFriend(conn)}
                >
                  <div className="connection-item-left">
                    <img
                      src={
                        conn.profileUrl ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                      }
                      alt={conn.fullName}
                    />
                    <div>
                      <b>{conn.fullName}</b>
                      <span>{conn.headline}</span>
                    </div>
                  </div>
                  {selectedFriend?._id === conn._id && (
                    <i className="fa fa-check-circle" style={{ color: "#62f7c7" }}></i>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="game-invite-footer">
          <button
            className="send-invite-btn"
            onClick={handleInvite}
            disabled={isSubmitting || !selectedFriend}
          >
            {isSubmitting ? "Sending..." : `Send Invitation${betCoins > 0 ? ` (${betCoins} coins)` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;
