import React, { useState, useEffect } from "react";
import "../components/games/games.css";
import TopNav from "../components/topnav/TopNav";
import InviteFriend from "../components/games/InviteFriend";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPendingInvitationsApi,
  getMyGamesApi,
  acceptGameApi,
  rejectGameApi,
  getLoggedinUser,
} from "../helper/apis";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { login } from "../redux/userSlice";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8900");

const GAME_LABELS = { tictactoe: "Tic Tac Toe", chess: "Chess", quiz: "Quiz", connect4: "Connect 4", rps: "Rock Paper Scissors", mathbattle: "Math Battle" };

const AllGames = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [inviteType, setInviteType] = useState(null);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [liveCoins, setLiveCoins] = useState(user?.coins ?? 0);

  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    loadPending();
    loadRecentGames();
    refreshCoins();
  }, []);

  useEffect(() => {
    setLiveCoins(user?.coins ?? 0);
  }, [user?.coins]);

  // Listen for real-time invitations
  useEffect(() => {
    const handleInvite = () => {
      loadPending();
    };
    const handleGameStarted = (data) => {
      navigate(`/game/${data.gameType}?id=${data.gameId}`);
    };

    const handleFocus = () => {
      refreshCoins();
    };

    socket.on("gameInviteReceived", handleInvite);
    socket.on("gameStarted", handleGameStarted);
    window.addEventListener("focus", handleFocus);

    return () => {
      socket.off("gameInviteReceived", handleInvite);
      socket.off("gameStarted", handleGameStarted);
      window.removeEventListener("focus", handleFocus);
    };
  }, [navigate]);

  const refreshCoins = async () => {
    const freshUser = await getLoggedinUser(dispatch);
    if (freshUser?._id) {
      setLiveCoins(freshUser.coins ?? 0);
      // Keep global store/localStorage in sync so other pages show same balance
      dispatch(login({ user: freshUser }));
    }
  };

  const loadPending = async () => {
    const res = await getPendingInvitationsApi();
    if (res?.status === "success") {
      setPendingInvites(res.games || []);
    }
  };

  const loadRecentGames = async () => {
    const res = await getMyGamesApi();
    if (res?.status === "success") {
      setRecentGames(res.games || []);
    }
  };

  const handleAccept = async (game) => {
    const res = await acceptGameApi(game._id);
    if (res?.status === "success") {
      toast.success("Game started!");
      refreshCoins();
      socket.emit("gameAccepted", {
        inviterId: game.invitedBy?._id || game.invitedBy,
        gameId: game._id,
        gameType: game.gameType,
      });
      navigate(`/game/${game.gameType}?id=${game._id}`);
    } else {
      toast.error(res?.message || "Failed to accept");
    }
  };

  const handleReject = async (game) => {
    const res = await rejectGameApi(game._id);
    if (res?.status === "success") {
      toast.info("Invitation rejected");
      refreshCoins();
      socket.emit("gameRejected", {
        inviterId: game.invitedBy?._id || game.invitedBy,
        gameId: game._id,
        message: `${user?.fullName} rejected your game invitation.`,
      });
      setPendingInvites((prev) => prev.filter((g) => g._id !== game._id));
    }
  };

  const handleGameCreated = (game) => {
    // Wait for opponent to accept — they'll get the socket event
    toast.info("Waiting for opponent to accept...");
    loadRecentGames();
    refreshCoins();
  };

  const ongoingGames = recentGames.filter((g) => g.gameState === "ongoing");

  return (
    <>
      <TopNav />
      <div className="resumes-page all-games-page">
        <div className="resumes-top">
          <h1 className="resumes-title">Games Zone</h1>
          <div className="resumes-text">
            Play games with your connections and earn coins
          </div>
        </div>

        <div className="games-coins-display">
          <i className="fa fa-coins"></i> {liveCoins} Coins
        </div>

        {/* Pending Invitations */}
        {pendingInvites.length > 0 && (
          <div className="pending-invitations">
            <div className="games-section-title">Pending Invitations</div>
            {pendingInvites.map((game) => {
              const inviter = game.players.find(
                (p) => (p._id || p) === (game.invitedBy?._id || game.invitedBy),
              );
              return (
                <div key={game._id} className="pending-invite-card">
                  <div className="pending-invite-left">
                    <img
                      src={
                        inviter?.profileUrl ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                      }
                      alt={inviter?.fullName}
                    />
                    <div className="pending-invite-info">
                      <b>{inviter?.fullName || "Someone"}</b>
                      <span>
                        {GAME_LABELS[game.gameType]} •{" "}
                        {game.betCoins > 0
                          ? `${game.betCoins} coins bet`
                          : "No bet"}
                      </span>
                    </div>
                  </div>
                  <div className="pending-invite-btns">
                    <button
                      className="reject-game-btn"
                      onClick={() => handleReject(game)}
                    >
                      Decline
                    </button>
                    <button
                      className="accept-game-btn"
                      onClick={() => handleAccept(game)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Ongoing Games */}
        {ongoingGames.length > 0 && (
          <div className="pending-invitations">
            <div className="games-section-title">Active Games</div>
            {ongoingGames.map((game) => {
              const opp = game.players.find((p) => p._id !== user?._id);
              return (
                <div
                  key={game._id}
                  className="pending-invite-card"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/game/${game.gameType}?id=${game._id}`)
                  }
                >
                  <div className="pending-invite-left">
                    <img
                      src={
                        opp?.profileUrl ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                      }
                      alt={opp?.fullName}
                    />
                    <div className="pending-invite-info">
                      <b>vs {opp?.fullName}</b>
                      <span>{GAME_LABELS[game.gameType]} • In Progress</span>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#62f7c7",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Resume →
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Game Cards */}
        <div
          className="games-section-title"
          style={{ maxWidth: "800px", margin: "10px auto" }}
        >
          Choose a Game
        </div>
        <div className="all-resumes games-grid">
          <div
            className="game-box"
            style={{ backgroundColor: "#e91e63" }}
            onClick={() => setInviteType("tictactoe")}
          >
            <div className="game-box-badge">Multiplayer</div>
            <div className="game-box-top">
              <img
                src="https://image.winudf.com/v2/image/Y29tLmZyZWVmdW5nYW1lcy50aWN0YWN0b2Uub25saW5lbXVsdGlwbGF5ZXJnYW1lc19zY3JlZW5fMTBfMTUyOTk3NzQ2Nl8wNzU/screen-10.jpg?fakeurl=1&type=.jpg"
                alt="tictactoe"
              />
            </div>
            <div className="game-box-bottom">
              <div>Tic Tac Toe</div>
              <i className="fa fa-gamepad"></i>
            </div>
          </div>

          <div
            className="game-box"
            style={{ backgroundColor: "#ff9800" }}
            onClick={() => setInviteType("chess")}
          >
            <div className="game-box-badge">Multiplayer</div>
            <div className="game-box-top">
              <img
                src="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/c/chess-classic-board-game-switch/hero"
                alt="chess"
              />
            </div>
            <div className="game-box-bottom">
              <div>Chess</div>
              <i className="fa fa-chess"></i>
            </div>
          </div>

          <div
            className="game-box"
            style={{ backgroundColor: "#7c4dff" }}
            onClick={() => setInviteType("quiz")}
          >
            <div className="game-box-badge">Multiplayer</div>
            <div className="game-box-top">
              <img
                src="https://th.bing.com/th/id/OIP.oD6RQEKXZWLh_EFSp4740QHaD3?rs=1&pid=ImgDetMain"
                alt="quiz"
              />
            </div>
            <div className="game-box-bottom">
              <div>Quiz Challenge</div>
              <i className="fa fa-question-circle"></i>
            </div>
          </div>

          <div
            className="game-box"
            style={{ backgroundColor: "#00bcd4" }}
            onClick={() => setInviteType("connect4")}
          >
            <div className="game-box-badge">Multiplayer</div>
            <div className="game-box-top">
              <img
                src="https://store-images.s-microsoft.com/image/apps.41929.13910108538401625.dfad4587-dfb3-4aa4-8bed-b5d2dd8fc79f.54781100-f7e4-4c22-89bf-257118f9ac23?mode=scale&q=90&h=1080&w=1920"
                alt="connect4"
              />
            </div>
            <div className="game-box-bottom">
              <div>Connect 4</div>
              <i className="fa fa-circle-nodes"></i>
            </div>
          </div>

          <div
            className="game-box"
            style={{ backgroundColor: "#4caf50" }}
            onClick={() => setInviteType("rps")}
          >
            <div className="game-box-badge">Multiplayer</div>
            <div className="game-box-top">
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/691/497/original/rock-paper-scissors-neon-icons-vector.jpg"
                alt="rps"
              />
            </div>
            <div className="game-box-bottom">
              <div>Rock Paper Scissors</div>
              <i className="fa fa-hand-scissors"></i>
            </div>
          </div>

          <div
            className="game-box"
            style={{ backgroundColor: "#ff5722" }}
            onClick={() => setInviteType("mathbattle")}
          >
            <div className="game-box-badge">Multiplayer</div>
            <div className="game-box-top">
              <img
                src="https://img-eshop.cdn.nintendo.net/i/3a713ab09eab3712092c60ca0b3cca20aeb22e645e6d63af0e7a5196dc601db6.jpg"
                alt="mathbattle"
              />
            </div>
            <div className="game-box-bottom">
              <div>Math Battle</div>
              <i className="fa fa-calculator"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {inviteType && (
        <InviteFriend
          onClose={() => setInviteType(null)}
          gameType={inviteType}
          socket={socket}
          onGameCreated={handleGameCreated}
        />
      )}
    </>
  );
};

export default AllGames;
