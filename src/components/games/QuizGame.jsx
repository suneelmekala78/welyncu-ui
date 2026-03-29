import React, { useState, useEffect, useCallback, useRef } from "react";
import "./games.css";
import TopNav from "../topnav/TopNav";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getGameApi, finishGameApi } from "../../helper/apis";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8900");
const TIMER_SECONDS = 15;

const QuizGame = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("id");

  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [opponent, setOpponent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [opponentAnswered, setOpponentAnswered] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [waitingForNext, setWaitingForNext] = useState(false);

  const timerRef = useRef(null);
  const hasAnsweredRef = useRef(false);

  // Load game
  useEffect(() => {
    if (!gameId) return;
    const loadGame = async () => {
      const res = await getGameApi(gameId);
      if (res?.status === "success") {
        const g = res.game;
        setGame(g);
        setQuestions(g.quizQuestions || []);
        setCurrentQ(g.currentQuestion || 0);

        const opp = g.players.find((p) => p._id !== user?._id);
        setOpponent(opp);
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

  // Timer
  useEffect(() => {
    if (gameOver || showResult || !questions.length) return;

    setTimer(TIMER_SECONDS);
    hasAnsweredRef.current = false;

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Time's up — auto submit no answer
          if (!hasAnsweredRef.current) {
            handleAnswer(-1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, gameOver, questions.length]);

  // Socket listeners
  useEffect(() => {
    const handleOpponentAnswer = (data) => {
      if (data.gameId !== gameId) return;
      setOpponentAnswered(true);
      if (data.isCorrect) {
        setOppScore((prev) => prev + 1);
      }
    };

    const handleNextQuestion = (data) => {
      if (data.gameId !== gameId) return;
      setCurrentQ(data.questionIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      setOpponentAnswered(false);
      setWaitingForNext(false);
      hasAnsweredRef.current = false;
    };

    const handleQuizGameOver = (data) => {
      if (data.gameId !== gameId) return;
      // The initiator already called finishGame on the server;
      // we just update local scores and wait for gameFinishedReceived
      setMyScore(data.oppFinalScore);
      setOppScore(data.myFinalScore);
    };

    const handleGameFinished = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      if (data.isDraw) setGameResult("draw");
      else if (data.winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
    };

    socket.on("quizAnswerReceived", handleOpponentAnswer);
    socket.on("quizNextQuestionReceived", handleNextQuestion);
    socket.on("quizGameOverReceived", handleQuizGameOver);
    socket.on("gameFinishedReceived", handleGameFinished);

    return () => {
      socket.off("quizAnswerReceived", handleOpponentAnswer);
      socket.off("quizNextQuestionReceived", handleNextQuestion);
      socket.off("quizGameOverReceived", handleQuizGameOver);
      socket.off("gameFinishedReceived", handleGameFinished);
    };
  }, [gameId, user?._id]);

  const handleAnswer = useCallback((answerIndex) => {
    if (hasAnsweredRef.current || gameOver) return;
    hasAnsweredRef.current = true;
    clearInterval(timerRef.current);

    const q = questions[currentQ];
    const isCorrect = answerIndex === q?.correctAnswer;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (isCorrect) {
      setMyScore((prev) => prev + 1);
    }

    socket.emit("quizAnswer", {
      gameId,
      opponentId: opponent?._id,
      playerId: user?._id,
      questionIndex: currentQ,
      answerIndex,
      isCorrect,
    });
  }, [gameId, opponent, user, currentQ, questions, gameOver]);

  const goToNextQuestion = () => {
    const nextQ = currentQ + 1;

    if (nextQ >= questions.length) {
      // Quiz over
      const finalMyScore = myScore;
      const finalOppScore = oppScore;

      socket.emit("quizGameOver", {
        gameId,
        opponentId: opponent?._id,
        myFinalScore: finalOppScore, // What opponent sees as "my" score
        oppFinalScore: finalMyScore,
      });

      finishTheGame(finalMyScore, finalOppScore);
      return;
    }

    setWaitingForNext(true);
    socket.emit("quizNextQuestion", {
      gameId,
      opponentId: opponent?._id,
      questionIndex: nextQ,
    });

    // Also advance locally
    setCurrentQ(nextQ);
    setSelectedAnswer(null);
    setShowResult(false);
    setOpponentAnswered(false);
    setWaitingForNext(false);
    hasAnsweredRef.current = false;
  };

  const finishTheGame = async (myFinal, oppFinal) => {
    let winnerId = null;
    let isDraw = false;

    if (myFinal > oppFinal) winnerId = user?._id;
    else if (oppFinal > myFinal) winnerId = opponent?._id;
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

  if (!game || !questions.length) {
    return (
      <div className="game-page">
        <TopNav />
        <div className="game-container" style={{ textAlign: "center", paddingTop: "100px" }}>
          <div style={{ color: "#999" }}>Loading quiz...</div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQ];
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="game-page">
      <TopNav />
      <div className="game-container">
        <div className="game-header">
          <h1>Quiz <span>Challenge</span></h1>
          <div className="game-info-bar">
            <span>Category: <b style={{ color: "#62f7c7" }}>{game.quizCategory || "General"}</b></span>
            {game.betCoins > 0 && (
              <span className="bet-info">
                <i className="fa fa-coins"></i> {game.betCoins} coins bet
              </span>
            )}
          </div>
        </div>

        <div className="quiz-container">
          {/* Scores */}
          <div className="quiz-scores">
            <div className="quiz-score-item">
              <img src={user?.profileUrl} alt="me" />
              <div>
                <div style={{ fontSize: "12px", color: "#999" }}>You</div>
                <div className="quiz-score-num">{myScore}</div>
              </div>
            </div>
            <div style={{ color: "#999", fontSize: "14px", alignSelf: "center" }}>VS</div>
            <div className="quiz-score-item">
              <img src={opponent?.profileUrl} alt="opponent" />
              <div>
                <div style={{ fontSize: "12px", color: "#999" }}>{opponent?.fullName}</div>
                <div className="quiz-score-num">{oppScore}</div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="quiz-progress">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`quiz-progress-dot ${i < currentQ ? "answered" : ""} ${i === currentQ ? "current" : ""}`}
              />
            ))}
          </div>

          {/* Timer */}
          {!showResult && (
            <div className="quiz-timer">
              <div style={{ color: timer <= 5 ? "#ff6b6b" : "#f7c662", fontSize: "24px", fontWeight: "700", marginBottom: "5px" }}>
                {timer}s
              </div>
              <div className="quiz-timer-bar">
                <div className="quiz-timer-fill" style={{ width: `${(timer / TIMER_SECONDS) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Question */}
          <div className="quiz-question-card">
            <div className="quiz-question-number">
              Question {currentQ + 1} of {questions.length}
            </div>
            <div className="quiz-question-text">
              {currentQuestion?.question}
            </div>

            <div className="quiz-options">
              {currentQuestion?.options?.map((option, i) => {
                let optionClass = "quiz-option";
                if (showResult) {
                  optionClass += " disabled";
                  if (i === currentQuestion.correctAnswer) optionClass += " correct";
                  else if (i === selectedAnswer && i !== currentQuestion.correctAnswer) optionClass += " wrong";
                } else if (selectedAnswer === i) {
                  optionClass += " selected";
                }

                return (
                  <div
                    key={i}
                    className={optionClass}
                    onClick={() => !showResult && !hasAnsweredRef.current && handleAnswer(i)}
                  >
                    <span className="quiz-option-letter">{letters[i]}</span>
                    <span>{option}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next / Finish */}
          {showResult && !gameOver && (
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#999", fontSize: "13px", marginBottom: "10px" }}>
                {opponentAnswered ? "Opponent has answered" : "Waiting for opponent..."}
              </div>
              <button
                className="send-invite-btn"
                style={{ width: "auto", padding: "10px 30px" }}
                onClick={goToNextQuestion}
              >
                {currentQ + 1 >= questions.length ? "Finish Quiz" : "Next Question →"}
              </button>
            </div>
          )}
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
            <div style={{ color: "#999", fontSize: "16px", marginBottom: "10px" }}>
              {myScore} - {oppScore}
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

export default QuizGame;
