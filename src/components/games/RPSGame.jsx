import React, { useState, useEffect } from "react";
import "./games.css";
import TopNav from "../topnav/TopNav";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getGameApi, finishGameApi } from "../../helper/apis";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8900");

const CHOICES = ["rock", "paper", "scissors"];
const CHOICE_EMOJI = { rock: "🪨", paper: "📄", scissors: "✂️" };

const getWinner = (c1, c2) => {
  if (c1 === c2) return "draw";
  if (
    (c1 === "rock" && c2 === "scissors") ||
    (c1 === "scissors" && c2 === "paper") ||
    (c1 === "paper" && c2 === "rock")
  )
    return "p1";
  return "p2";
};

const RPSGame = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("id");

  const [game, setGame] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [totalRounds, setTotalRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [myChoice, setMyChoice] = useState(null);
  const [oppChoice, setOppChoice] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [amPlayer1, setAmPlayer1] = useState(true);

  // Load game
  useEffect(() => {
    if (!gameId) return;
    (async () => {
      const res = await getGameApi(gameId);
      if (res?.status === "success") {
        const g = res.game;
        setGame(g);
        setTotalRounds(g.rounds);
        setAmPlayer1(g.players[0]._id === user?._id);
        setOpponent(g.players.find((p) => p._id !== user?._id));
      } else {
        toast.error("Game not found");
        navigate("/games");
      }
    })();
  }, [gameId, user?._id]);

  useEffect(() => {
    if (user?._id) socket.emit("addUser", user._id);
  }, [user?._id]);

  // Socket listeners
  useEffect(() => {
    // Opponent sends their choice (actual value)
    const onOppReveal = (data) => {
      if (data.gameId !== gameId) return;
      setOppChoice(data.choice);
    };

    const onNextRound = (data) => {
      if (data.gameId !== gameId) return;
      setCurrentRound(data.round);
      setMyChoice(null);
      setOppChoice(null);
      setRoundResult(null);
      setShowReveal(false);
    };

    const onFinished = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      if (data.isDraw) setGameResult("draw");
      else if (data.winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
    };

    socket.on("rpsRevealReceived", onOppReveal);
    socket.on("rpsNextRoundReceived", onNextRound);
    socket.on("gameFinishedReceived", onFinished);
    return () => {
      socket.off("rpsRevealReceived", onOppReveal);
      socket.off("rpsNextRoundReceived", onNextRound);
      socket.off("gameFinishedReceived", onFinished);
    };
  }, [gameId, user?._id]);

  // Pick a choice → send to opponent immediately
  const pickChoice = (choice) => {
    if (myChoice || gameOver) return;
    setMyChoice(choice);
    socket.emit("rpsReveal", {
      gameId,
      opponentId: opponent?._id,
      choice,
    });
  };

  // When both choices known → compute round result
  useEffect(() => {
    if (myChoice && oppChoice && !showReveal) {
      setShowReveal(true);
      const p1c = amPlayer1 ? myChoice : oppChoice;
      const p2c = amPlayer1 ? oppChoice : myChoice;
      const w = getWinner(p1c, p2c);

      if (w === "draw") {
        setRoundResult("draw");
      } else if ((w === "p1" && amPlayer1) || (w === "p2" && !amPlayer1)) {
        setRoundResult("win");
        setMyScore((s) => s + 1);
      } else {
        setRoundResult("lose");
        setOppScore((s) => s + 1);
      }
    }
  }, [myChoice, oppChoice, showReveal, amPlayer1]);

  const nextRound = () => {
    const maxWins = Math.ceil(totalRounds / 2);
    if (myScore >= maxWins || oppScore >= maxWins || currentRound >= totalRounds) {
      finishEntireGame();
      return;
    }
    const next = currentRound + 1;
    setCurrentRound(next);
    setMyChoice(null);
    setOppChoice(null);
    setRoundResult(null);
    setShowReveal(false);
    socket.emit("rpsNextRound", { gameId, opponentId: opponent?._id, round: next });
  };

  const finishEntireGame = async () => {
    let winnerId = null;
    let isDraw = false;
    if (myScore > oppScore) winnerId = user?._id;
    else if (oppScore > myScore) winnerId = opponent?._id;
    else isDraw = true;

    const res = await finishGameApi({ gameId, winnerId, isDraw });
    if (res?.status === "success") {
      setGameOver(true);
      if (isDraw) setGameResult("draw");
      else if (winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
      socket.emit("gameFinished", { gameId, opponentId: opponent?._id, winnerId, isDraw });
    }
  };

  if (!game) {
    return (
      <div className="game-page">
        <TopNav />
        <div className="game-container" style={{ textAlign: "center", paddingTop: "100px" }}>
          <div style={{ color: "#999" }}>Loading game...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page">
      <TopNav />
      <div className="game-container">
        <div className="game-header">
          <h1>Rock Paper <span>Scissors</span></h1>
          <div className="game-info-bar">
            <span>Round <b style={{ color: "#62f7c7" }}>{currentRound}/{totalRounds}</b></span>
            {game.betCoins > 0 && (
              <span className="bet-info"><i className="fa fa-coins"></i> {game.betCoins} coins bet</span>
            )}
          </div>
        </div>

        <div className="rps-container">
          {/* Scores */}
          <div className="quiz-scores" style={{ marginBottom: "30px" }}>
            <div className="quiz-score-item">
              <img src={user?.profileUrl} alt="me" />
              <div>
                <div style={{ fontSize: "12px", color: "#999" }}>You</div>
                <div className="quiz-score-num">{myScore}</div>
              </div>
            </div>
            <div style={{ color: "#999", fontSize: "14px", alignSelf: "center" }}>VS</div>
            <div className="quiz-score-item">
              <img src={opponent?.profileUrl} alt="opp" />
              <div>
                <div style={{ fontSize: "12px", color: "#999" }}>{opponent?.fullName}</div>
                <div className="quiz-score-num">{oppScore}</div>
              </div>
            </div>
          </div>

          {/* Choice / Reveal */}
          {!showReveal ? (
            <div className="rps-choice-area">
              <div className="rps-prompt">
                {myChoice
                  ? "Waiting for opponent..."
                  : oppChoice
                  ? "Opponent is ready! Pick now!"
                  : "Make your choice!"}
              </div>
              <div className="rps-choices">
                {CHOICES.map((c) => (
                  <div
                    key={c}
                    className={`rps-choice-card ${myChoice === c ? "selected" : ""} ${myChoice && myChoice !== c ? "dimmed" : ""}`}
                    onClick={() => pickChoice(c)}
                  >
                    <span className="rps-emoji">{CHOICE_EMOJI[c]}</span>
                    <span className="rps-label">{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rps-reveal-area">
              <div className="rps-reveal-cards">
                <div className="rps-reveal-card">
                  <div className="rps-reveal-name">You</div>
                  <div className="rps-reveal-emoji">{CHOICE_EMOJI[myChoice]}</div>
                  <div className="rps-reveal-label">{myChoice}</div>
                </div>
                <div className="rps-vs">VS</div>
                <div className="rps-reveal-card">
                  <div className="rps-reveal-name">{opponent?.fullName?.split(" ")[0]}</div>
                  <div className="rps-reveal-emoji">{CHOICE_EMOJI[oppChoice]}</div>
                  <div className="rps-reveal-label">{oppChoice}</div>
                </div>
              </div>
              <div
                className="rps-round-result"
                style={{
                  color: roundResult === "win" ? "#62f7c7" : roundResult === "lose" ? "#ff6b6b" : "#f7c662",
                }}
              >
                {roundResult === "win" ? "You win this round!" : roundResult === "lose" ? "You lose this round!" : "It's a tie!"}
              </div>
              {!gameOver && (
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                  <button className="send-invite-btn" style={{ width: "auto", padding: "10px 30px" }} onClick={nextRound}>
                    {currentRound >= totalRounds || myScore >= Math.ceil(totalRounds / 2) || oppScore >= Math.ceil(totalRounds / 2)
                      ? "Finish Game"
                      : "Next Round →"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {gameOver && (
        <div className="game-result-overlay">
          <div className="game-result-card">
            <div className="game-result-icon">{gameResult === "win" ? "🏆" : gameResult === "lose" ? "😔" : "🤝"}</div>
            <div className={`game-result-title ${gameResult}`}>
              {gameResult === "win" ? "You Won!" : gameResult === "lose" ? "You Lost!" : "It's a Draw!"}
            </div>
            {game.betCoins > 0 && (
              <div className="game-result-coins">
                {gameResult === "win" ? `+${game.betCoins * 2} coins` : gameResult === "draw" ? `${game.betCoins} coins refunded` : `-${game.betCoins} coins`}
              </div>
            )}
            <div className="game-result-btns">
              <button className="game-result-btn primary" onClick={() => navigate("/games")}>Back to Games</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RPSGame;
