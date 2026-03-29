import React, { useState, useEffect, useCallback } from "react";
import "./games.css";
import TopNav from "../topnav/TopNav";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getGameApi, finishGameApi } from "../../helper/apis";
import { toast } from "react-toastify";
import io from "socket.io-client";

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8900");

const TicTocToe = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("id");

  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [mySymbol, setMySymbol] = useState("X");
  const [scores, setScores] = useState({});
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(3);
  const [winningCells, setWinningCells] = useState([]);
  const [roundResult, setRoundResult] = useState(null); // null | "win" | "lose" | "draw"
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [opponent, setOpponent] = useState(null);

  // Load game
  useEffect(() => {
    if (!gameId) return;
    const loadGame = async () => {
      const res = await getGameApi(gameId);
      if (res?.status === "success") {
        const g = res.game;
        setGame(g);
        setTotalRounds(g.rounds);
        setCurrentRound(g.currentRound || 1);

        const opp = g.players.find((p) => p._id !== user?._id);
        setOpponent(opp);

        // First player is X
        const amIFirstPlayer = g.players[0]._id === user?._id;
        setMySymbol(amIFirstPlayer ? "X" : "O");
        setIsMyTurn(amIFirstPlayer);

        // Initialize scores
        const s = {};
        g.players.forEach((p) => { s[p._id] = 0; });
        if (g.scores) {
          Object.entries(g.scores).forEach(([k, v]) => { s[k] = v; });
        }
        setScores(s);
      } else {
        toast.error("Game not found");
        navigate("/games");
      }
    };
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, user?._id]);

  // Socket: register user
  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }
  }, [user?._id]);

  // Socket: listen for opponent moves
  useEffect(() => {
    const handleMove = (data) => {
      if (data.gameId !== gameId) return;
      setBoard(data.board);
      setIsMyTurn(data.nextTurn === user?._id);
    };

    const handleRoundEnd = (data) => {
      if (data.gameId !== gameId) return;
      if (data.winningCells) setWinningCells(data.winningCells);
      if (data.winnerId === user?._id) setRoundResult("win");
      else if (data.isDraw) setRoundResult("draw");
      else setRoundResult("lose");

      setScores(data.scores);
    };

    const handleNewRound = (data) => {
      if (data.gameId !== gameId) return;
      setBoard(Array(9).fill(""));
      setWinningCells([]);
      setRoundResult(null);
      setCurrentRound(data.round);
      setIsMyTurn(data.nextTurn === user?._id);
    };

    const handleGameFinished = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      if (data.isDraw) setGameResult("draw");
      else if (data.winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
    };

    socket.on("tttMoveReceived", handleMove);
    socket.on("tttRoundEnded", handleRoundEnd);
    socket.on("tttNewRoundStarted", handleNewRound);
    socket.on("gameFinishedReceived", handleGameFinished);

    return () => {
      socket.off("tttMoveReceived", handleMove);
      socket.off("tttRoundEnded", handleRoundEnd);
      socket.off("tttNewRoundStarted", handleNewRound);
      socket.off("gameFinishedReceived", handleGameFinished);
    };
  }, [gameId, user?._id]);

  const checkWinner = useCallback((b) => {
    for (const [a, bIdx, c] of WINNING_LINES) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return { winner: b[a], cells: [a, bIdx, c] };
      }
    }
    if (b.every((cell) => cell !== "")) return { winner: "draw", cells: [] };
    return null;
  }, []);

  const handleCellClick = (index) => {
    if (!isMyTurn || board[index] || roundResult || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = mySymbol;
    setBoard(newBoard);
    setIsMyTurn(false);

    const result = checkWinner(newBoard);

    // Emit move
    socket.emit("tttMove", {
      gameId,
      opponentId: opponent?._id,
      index,
      symbol: mySymbol,
      nextTurn: opponent?._id,
      board: newBoard,
    });

    if (result) {
      const newScores = { ...scores };
      let winnerId = null;
      let isDraw = false;

      if (result.winner === "draw") {
        isDraw = true;
      } else {
        winnerId = result.winner === mySymbol ? user?._id : opponent?._id;
        newScores[winnerId] = (newScores[winnerId] || 0) + 1;
      }

      setScores(newScores);
      setWinningCells(result.cells);
      if (winnerId === user?._id) setRoundResult("win");
      else if (isDraw) setRoundResult("draw");
      else setRoundResult("lose");

      socket.emit("tttRoundEnd", {
        gameId,
        opponentId: opponent?._id,
        winnerId,
        isDraw,
        winningCells: result.cells,
        scores: newScores,
      });

      // Check if game is over
      const maxWins = Math.ceil(totalRounds / 2);
      const myScore = newScores[user?._id] || 0;
      const oppScore = newScores[opponent?._id] || 0;

      if (myScore >= maxWins || oppScore >= maxWins || currentRound >= totalRounds) {
        setTimeout(() => finishEntireGame(newScores), 2000);
      }
    }
  };

  const startNextRound = () => {
    if (currentRound >= totalRounds) {
      finishEntireGame(scores);
      return;
    }

    const nextRound = currentRound + 1;
    const nextBoard = Array(9).fill("");
    setBoard(nextBoard);
    setWinningCells([]);
    setRoundResult(null);
    setCurrentRound(nextRound);

    // Alternate who starts
    const iStart = nextRound % 2 === 1;
    setIsMyTurn(game?.players[0]._id === user?._id ? iStart : !iStart);

    socket.emit("tttNewRound", {
      gameId,
      opponentId: opponent?._id,
      round: nextRound,
      nextTurn: iStart
        ? (game?.players[0]._id === user?._id ? user?._id : opponent?._id)
        : (game?.players[0]._id === user?._id ? opponent?._id : user?._id),
    });
  };

  const finishEntireGame = async (finalScores) => {
    const myScore = finalScores[user?._id] || 0;
    const oppScore = finalScores[opponent?._id] || 0;

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

      socket.emit("gameFinished", {
        gameId,
        opponentId: opponent?._id,
        winnerId,
        isDraw,
      });
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
          <h1>Tic Tac <span>Toe</span></h1>
          <div className="game-info-bar">
            <span>Round <b style={{ color: "#62f7c7" }}>{currentRound}/{totalRounds}</b></span>
            {game.betCoins > 0 && (
              <span className="bet-info">
                <i className="fa fa-coins"></i> {game.betCoins} coins bet
              </span>
            )}
          </div>
        </div>

        <div className="game-layout">
          {/* Player 1 (Me) */}
          <div className={`player-card ${isMyTurn && !roundResult ? "active-turn" : ""}`}>
            <div className="player-card-top">
              <img src={user?.profileUrl} alt="me" />
              <div className="titles">
                <b>{user?.fullName} (You)</b>
                <span>{isMyTurn && !roundResult ? "Your turn" : ""}</span>
              </div>
              <span className="player-symbol" style={{ background: mySymbol === "X" ? "#ff6b6b" : "#62f7c7", color: "#fff" }}>
                {mySymbol}
              </span>
            </div>
            <div className="player-card-bottom">
              <span>Wins</span>
              <span className="score">{scores[user?._id] || 0}</span>
            </div>
          </div>

          {/* Board */}
          <div className="game-board-section">
            {!roundResult && (
              <div className={`turn-indicator ${isMyTurn ? "your-turn" : "opponent-turn"}`}>
                {isMyTurn ? "Your Turn!" : `${opponent?.fullName}'s Turn`}
              </div>
            )}

            <div className="ttt-board">
              {board.map((cell, i) => (
                <div
                  key={i}
                  className={`ttt-cell ${cell ? "filled" : ""} ${winningCells.includes(i) ? "winning-cell" : ""}`}
                  onClick={() => handleCellClick(i)}
                >
                  {cell === "X" && <span className="x-mark">✕</span>}
                  {cell === "O" && <span className="o-mark">○</span>}
                </div>
              ))}
            </div>

            {roundResult && !gameOver && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <div style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: roundResult === "win" ? "#62f7c7" : roundResult === "lose" ? "#ff6b6b" : "#f7c662",
                  marginBottom: "10px",
                }}>
                  {roundResult === "win" ? "You won this round!" : roundResult === "lose" ? "You lost this round!" : "It's a draw!"}
                </div>
                {currentRound < totalRounds && (
                  <button
                    className="send-invite-btn"
                    style={{ width: "auto", padding: "10px 30px" }}
                    onClick={startNextRound}
                  >
                    Next Round →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Player 2 (Opponent) */}
          <div className={`player-card ${!isMyTurn && !roundResult ? "active-turn" : ""}`}>
            <div className="player-card-top">
              <img src={opponent?.profileUrl} alt="opponent" />
              <div className="titles">
                <b>{opponent?.fullName}</b>
                <span>{!isMyTurn && !roundResult ? "Their turn" : ""}</span>
              </div>
              <span className="player-symbol" style={{ background: mySymbol === "X" ? "#62f7c7" : "#ff6b6b", color: "#fff" }}>
                {mySymbol === "X" ? "O" : "X"}
              </span>
            </div>
            <div className="player-card-bottom">
              <span>Wins</span>
              <span className="score">{scores[opponent?._id] || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Result */}
      {gameOver && (
        <div className="game-result-overlay">
          <div className="game-result-card">
            <div className="game-result-icon">
              {gameResult === "win" ? "🏆" : gameResult === "lose" ? "😔" : "🤝"}
            </div>
            <div className={`game-result-title ${gameResult}`}>
              {gameResult === "win" ? "You Won!" : gameResult === "lose" ? "You Lost!" : "It's a Draw!"}
            </div>
            {game.betCoins > 0 && (
              <div className="game-result-coins">
                {gameResult === "win"
                  ? `+${game.betCoins * 2} coins`
                  : gameResult === "draw"
                  ? `${game.betCoins} coins refunded`
                  : `-${game.betCoins} coins`}
              </div>
            )}
            <div className="game-result-btns">
              <button className="game-result-btn primary" onClick={() => navigate("/games")}>
                Back to Games
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTocToe;
