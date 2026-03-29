import React, { useState, useEffect, useCallback } from "react";
import "./games.css";
import TopNav from "../topnav/TopNav";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getGameApi, finishGameApi } from "../../helper/apis";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8900");
const ROWS = 6;
const COLS = 7;

const checkWinner = (board) => {
  // Horizontal
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const v = board[r][c];
      if (v && v === board[r][c + 1] && v === board[r][c + 2] && v === board[r][c + 3]) {
        return { winner: v, cells: [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]] };
      }
    }
  }
  // Vertical
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c < COLS; c++) {
      const v = board[r][c];
      if (v && v === board[r + 1][c] && v === board[r + 2][c] && v === board[r + 3][c]) {
        return { winner: v, cells: [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]] };
      }
    }
  }
  // Diagonal ↘
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const v = board[r][c];
      if (v && v === board[r + 1][c + 1] && v === board[r + 2][c + 2] && v === board[r + 3][c + 3]) {
        return { winner: v, cells: [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]] };
      }
    }
  }
  // Diagonal ↙
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 3; c < COLS; c++) {
      const v = board[r][c];
      if (v && v === board[r + 1][c - 1] && v === board[r + 2][c - 2] && v === board[r + 3][c - 3]) {
        return { winner: v, cells: [[r, c], [r + 1, c - 1], [r + 2, c - 2], [r + 3, c - 3]] };
      }
    }
  }
  // Draw
  if (board.every((row) => row.every((cell) => cell !== 0))) {
    return { winner: "draw", cells: [] };
  }
  return null;
};

const Connect4Game = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("id");

  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(() => Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [myColor, setMyColor] = useState(1); // 1 = red, 2 = yellow
  const [opponent, setOpponent] = useState(null);
  const [winCells, setWinCells] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [hoverCol, setHoverCol] = useState(-1);

  useEffect(() => {
    if (!gameId) return;
    const load = async () => {
      const res = await getGameApi(gameId);
      if (res?.status === "success") {
        const g = res.game;
        setGame(g);
        const amFirst = g.players[0]._id === user?._id;
        setMyColor(amFirst ? 1 : 2);
        setIsMyTurn(amFirst);
        setOpponent(g.players.find((p) => p._id !== user?._id));
        if (g.connect4Board) setBoard(g.connect4Board);
      } else {
        toast.error("Game not found");
        navigate("/games");
      }
    };
    load();
  }, [gameId, user?._id]);

  useEffect(() => {
    if (user?._id) socket.emit("addUser", user._id);
  }, [user?._id]);

  useEffect(() => {
    const handleMove = (data) => {
      if (data.gameId !== gameId) return;
      setBoard(data.board);
      setIsMyTurn(data.nextTurn === user?._id);
    };
    const handleFinished = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      if (data.isDraw) setGameResult("draw");
      else if (data.winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
    };
    socket.on("c4MoveReceived", handleMove);
    socket.on("gameFinishedReceived", handleFinished);
    return () => {
      socket.off("c4MoveReceived", handleMove);
      socket.off("gameFinishedReceived", handleFinished);
    };
  }, [gameId, user?._id]);

  const dropPiece = useCallback((col) => {
    if (!isMyTurn || gameOver) return;
    // Find lowest empty row
    let row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === 0) { row = r; break; }
    }
    if (row === -1) return; // column full

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = myColor;
    setBoard(newBoard);
    setIsMyTurn(false);

    socket.emit("c4Move", {
      gameId,
      opponentId: opponent?._id,
      col,
      row,
      player: myColor,
      board: newBoard,
      nextTurn: opponent?._id,
    });

    const result = checkWinner(newBoard);
    if (result) {
      if (result.cells.length) setWinCells(result.cells);
      finishTheGame(result.winner === "draw", result.winner === myColor ? user?._id : result.winner === "draw" ? null : opponent?._id);
    }
  }, [isMyTurn, gameOver, board, myColor, gameId, opponent, user]);

  const finishTheGame = async (isDraw, winnerId) => {
    const res = await finishGameApi({ gameId, winnerId, isDraw });
    if (res?.status === "success") {
      setGameOver(true);
      if (isDraw) setGameResult("draw");
      else if (winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
      socket.emit("gameFinished", { gameId, opponentId: opponent?._id, winnerId, isDraw });
    }
  };

  const isWinCell = (r, c) => winCells.some(([wr, wc]) => wr === r && wc === c);

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
          <h1>Connect <span>4</span></h1>
          <div className="game-info-bar">
            <span>You are <b style={{ color: myColor === 1 ? "#ff6b6b" : "#f7c662" }}>{myColor === 1 ? "Red" : "Yellow"}</b></span>
            {game.betCoins > 0 && (
              <span className="bet-info"><i className="fa fa-coins"></i> {game.betCoins} coins bet</span>
            )}
          </div>
        </div>

        <div className="game-layout">
          <div className={`player-card ${isMyTurn && !gameOver ? "active-turn" : ""}`}>
            <div className="player-card-top">
              <img src={user?.profileUrl} alt="me" />
              <div className="titles">
                <b>{user?.fullName} (You)</b>
                <span>{isMyTurn && !gameOver ? "Your turn" : ""}</span>
              </div>
              <span className="player-symbol" style={{ background: myColor === 1 ? "#ff6b6b" : "#f7c662" }}>
                {myColor === 1 ? "🔴" : "🟡"}
              </span>
            </div>
          </div>

          <div className="game-board-section">
            {!gameOver && (
              <div className={`turn-indicator ${isMyTurn ? "your-turn" : "opponent-turn"}`}>
                {isMyTurn ? "Your Turn!" : `${opponent?.fullName}'s Turn`}
              </div>
            )}

            <div className="c4-board">
              {board.map((row, ri) =>
                row.map((cell, ci) => (
                  <div
                    key={`${ri}-${ci}`}
                    className={`c4-cell ${isWinCell(ri, ci) ? "winning-cell" : ""}`}
                    onClick={() => dropPiece(ci)}
                    onMouseEnter={() => setHoverCol(ci)}
                    onMouseLeave={() => setHoverCol(-1)}
                    style={hoverCol === ci && isMyTurn && !gameOver && cell === 0 ? { opacity: 0.8 } : {}}
                  >
                    <div className={`c4-piece ${cell === 1 ? "red" : cell === 2 ? "yellow" : ""}`} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={`player-card ${!isMyTurn && !gameOver ? "active-turn" : ""}`}>
            <div className="player-card-top">
              <img src={opponent?.profileUrl} alt="opponent" />
              <div className="titles">
                <b>{opponent?.fullName}</b>
                <span>{!isMyTurn && !gameOver ? "Their turn" : ""}</span>
              </div>
              <span className="player-symbol" style={{ background: myColor === 1 ? "#f7c662" : "#ff6b6b" }}>
                {myColor === 1 ? "🟡" : "🔴"}
              </span>
            </div>
          </div>
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

export default Connect4Game;
