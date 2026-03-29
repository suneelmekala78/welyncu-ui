import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./games.css";
import TopNav from "../topnav/TopNav";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getGameApi, finishGameApi } from "../../helper/apis";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { Chess } from "chess.js";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8900");

const PIECE_UNICODE = {
  wp: "♙", wr: "♖", wn: "♘", wb: "♗", wq: "♕", wk: "♔",
  bp: "♟", br: "♜", bn: "♞", bb: "♝", bq: "♛", bk: "♚",
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const ChessGame = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("id");

  const [game, setGame] = useState(null);
  const [chess, setChess] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [myColor, setMyColor] = useState("w"); // w or b
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [status, setStatus] = useState("");

  // Load game
  useEffect(() => {
    if (!gameId) return;
    const loadGame = async () => {
      const res = await getGameApi(gameId);
      if (res?.status === "success") {
        const g = res.game;
        setGame(g);

        const amIFirstPlayer = g.players[0]._id === user?._id;
        setMyColor(amIFirstPlayer ? "w" : "b");

        const opp = g.players.find((p) => p._id !== user?._id);
        setOpponent(opp);

        // Restore position from FEN if available
        if (g.chessFen) {
          const c = new Chess(g.chessFen);
          setChess(c);
          setIsMyTurn(c.turn() === (amIFirstPlayer ? "w" : "b"));
          updateStatus(c);
        } else {
          setIsMyTurn(amIFirstPlayer);
        }
      } else {
        toast.error("Game not found");
        navigate("/games");
      }
    };
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, user?._id]);

  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }
  }, [user?._id]);

  const updateStatus = useCallback((c) => {
    if (c.isCheckmate()) {
      setStatus("Checkmate!");
    } else if (c.isDraw()) {
      setStatus("Draw!");
    } else if (c.isStalemate()) {
      setStatus("Stalemate!");
    } else if (c.isCheck()) {
      setStatus("Check!");
    } else {
      setStatus("");
    }
  }, []);

  // Socket: listen for opponent moves
  useEffect(() => {
    const handleMoveReceived = (data) => {
      if (data.gameId !== gameId) return;
      const c = new Chess(data.fen);
      setChess(c);
      setIsMyTurn(c.turn() === myColor);
      setSelectedSquare(null);
      setValidMoves([]);
      updateStatus(c);

      // Don't call finishGame here — the mover already handles it,
      // and we'll get the result via gameFinishedReceived socket event
    };

    const handleGameOver = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      if (data.isDraw) setGameResult("draw");
      else if (data.winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
    };

    const handleResign = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      setGameResult(data.resignedBy === user?._id ? "lose" : "win");
    };

    const handleGameFinished = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      if (data.isDraw) setGameResult("draw");
      else if (data.winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
    };

    socket.on("chessMoveReceived", handleMoveReceived);
    socket.on("chessGameOverReceived", handleGameOver);
    socket.on("chessResignReceived", handleResign);
    socket.on("gameFinishedReceived", handleGameFinished);

    return () => {
      socket.off("chessMoveReceived", handleMoveReceived);
      socket.off("chessGameOverReceived", handleGameOver);
      socket.off("chessResignReceived", handleResign);
      socket.off("gameFinishedReceived", handleGameFinished);
    };
  }, [gameId, user?._id, myColor, updateStatus]);

  const handleGameEndFromState = useCallback(async (c) => {
    let winnerId = null;
    let isDraw = false;

    if (c.isCheckmate()) {
      // The player whose turn it is has been checkmated (they lost)
      winnerId = c.turn() === myColor ? opponent?._id : user?._id;
    } else {
      isDraw = true;
    }

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
  }, [gameId, myColor, opponent, user]);

  const handleSquareClick = (row, col) => {
    if (!isMyTurn || gameOver) return;

    const square = FILES[col] + (8 - row);
    const piece = chess.get(square);

    if (selectedSquare) {
      // Try to move
      const move = { from: selectedSquare, to: square };

      // Check for pawn promotion
      const srcPiece = chess.get(selectedSquare);
      if (srcPiece?.type === "p" && (row === 0 || row === 7)) {
        move.promotion = "q";
      }

      try {
        const result = chess.move(move);
        if (result) {
          const newFen = chess.fen();
          setIsMyTurn(false);
          setSelectedSquare(null);
          setValidMoves([]);
          updateStatus(chess);

          socket.emit("chessMove", {
            gameId,
            opponentId: opponent?._id,
            move: result.san,
            fen: newFen,
          });

          if (chess.isGameOver()) {
            handleGameEndFromState(chess);
          }
        }
      } catch {
        // Invalid move, try selecting new piece
        if (piece && piece.color === myColor) {
          setSelectedSquare(square);
          const moves = chess.moves({ square, verbose: true });
          setValidMoves(moves.map((m) => m.to));
        } else {
          setSelectedSquare(null);
          setValidMoves([]);
        }
      }
    } else {
      // Select a piece
      if (piece && piece.color === myColor) {
        setSelectedSquare(square);
        const moves = chess.moves({ square, verbose: true });
        setValidMoves(moves.map((m) => m.to));
      }
    }
  };

  const handleResign = async () => {
    const winnerId = opponent?._id;
    const res = await finishGameApi({ gameId, winnerId, isDraw: false });
    if (res?.status === "success") {
      setGameOver(true);
      setGameResult("lose");

      socket.emit("chessResign", {
        gameId,
        opponentId: opponent?._id,
        resignedBy: user?._id,
      });
    }
  };

  // Build the board display - flip for black
  const boardRows = useMemo(() => {
    const rows = [];
    const board = chess.board();
    const displayBoard = myColor === "b" ? [...board].reverse().map((r) => [...r].reverse()) : board;

    for (let r = 0; r < 8; r++) {
      const row = [];
      for (let c = 0; c < 8; c++) {
        const actualRow = myColor === "b" ? 7 - r : r;
        const actualCol = myColor === "b" ? 7 - c : c;
        const square = FILES[actualCol] + (8 - actualRow);
        const piece = displayBoard[r][c];
        const isLight = (r + c) % 2 === 0;
        const isSelected = selectedSquare === square;
        const isValidMove = validMoves.includes(square);
        const hasPiece = !!piece;

        const pieceKey = piece ? piece.color + piece.type : null;

        row.push({
          key: `${r}-${c}`,
          square,
          actualRow,
          actualCol,
          isLight,
          isSelected,
          isValidMove,
          hasPiece,
          pieceUnicode: pieceKey ? PIECE_UNICODE[pieceKey] : null,
          pieceColor: piece?.color,
        });
      }
      rows.push(row);
    }
    return rows;
  }, [chess, myColor, selectedSquare, validMoves]);

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
          <h1>Chess <span>Match</span></h1>
          <div className="game-info-bar">
            <span>You play as <b style={{ color: "#62f7c7" }}>{myColor === "w" ? "White" : "Black"}</b></span>
            {game.betCoins > 0 && (
              <span className="bet-info">
                <i className="fa fa-coins"></i> {game.betCoins} coins bet
              </span>
            )}
          </div>
        </div>

        <div className="game-layout">
          {/* Player 1 (Me) */}
          <div className={`player-card ${isMyTurn && !gameOver ? "active-turn" : ""}`}>
            <div className="player-card-top">
              <img src={user?.profileUrl} alt="me" />
              <div className="titles">
                <b>{user?.fullName} (You)</b>
                <span>{isMyTurn && !gameOver ? "Your turn" : ""}</span>
              </div>
              <span className="player-symbol" style={{ background: myColor === "w" ? "#f0d9b5" : "#333", color: myColor === "w" ? "#333" : "#f0d9b5" }}>
                {myColor === "w" ? "♔" : "♚"}
              </span>
            </div>
            <div className="player-card-bottom">
              <span>{myColor === "w" ? "White" : "Black"}</span>
            </div>
          </div>

          {/* Board */}
          <div className="game-board-section">
            {!gameOver && (
              <div className={`turn-indicator ${isMyTurn ? "your-turn" : "opponent-turn"}`}>
                {isMyTurn ? "Your Turn!" : `${opponent?.fullName}'s Turn`}
              </div>
            )}

            {status && (
              <div className={`chess-status ${status === "Check!" ? "check" : ""}`}>
                {status}
              </div>
            )}

            <div className="chess-board-container">
              <div className="chess-board">
                {boardRows.map((row, ri) =>
                  row.map((cell) => (
                    <div
                      key={cell.key}
                      className={`chess-cell ${cell.isLight ? "light" : "dark"} ${cell.isSelected ? "selected" : ""} ${cell.isValidMove && !cell.hasPiece ? "valid-move" : ""} ${cell.isValidMove && cell.hasPiece ? "valid-capture" : ""}`}
                      onClick={() => handleSquareClick(cell.actualRow, cell.actualCol)}
                    >
                      {cell.pieceUnicode && (
                        <span style={{ color: cell.pieceColor === "w" ? "#fff" : "#000", textShadow: cell.pieceColor === "w" ? "0 1px 3px rgba(0,0,0,0.5)" : "0 1px 3px rgba(255,255,255,0.3)" }}>
                          {cell.pieceUnicode}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {!gameOver && (
              <button className="chess-resign-btn" onClick={handleResign}>
                <i className="fa fa-flag"></i> Resign
              </button>
            )}
          </div>

          {/* Player 2 (Opponent) */}
          <div className={`player-card ${!isMyTurn && !gameOver ? "active-turn" : ""}`}>
            <div className="player-card-top">
              <img src={opponent?.profileUrl} alt="opponent" />
              <div className="titles">
                <b>{opponent?.fullName}</b>
                <span>{!isMyTurn && !gameOver ? "Their turn" : ""}</span>
              </div>
              <span className="player-symbol" style={{ background: myColor === "w" ? "#333" : "#f0d9b5", color: myColor === "w" ? "#f0d9b5" : "#333" }}>
                {myColor === "w" ? "♚" : "♔"}
              </span>
            </div>
            <div className="player-card-bottom">
              <span>{myColor === "w" ? "Black" : "White"}</span>
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

export default ChessGame;
