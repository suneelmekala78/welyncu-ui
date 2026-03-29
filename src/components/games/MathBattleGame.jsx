import React, { useState, useEffect, useRef } from "react";
import "./games.css";
import TopNav from "../topnav/TopNav";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getGameApi, finishGameApi } from "../../helper/apis";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8900");
const TIMER_SECONDS = 15;

const MathBattleGame = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("id");

  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [myCorrect, setMyCorrect] = useState(null);
  const [oppAnswered, setOppAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [opponent, setOpponent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const timerRef = useRef(null);
  const hasAnsweredRef = useRef(false);
  const inputRef = useRef(null);

  // Load game
  useEffect(() => {
    if (!gameId) return;
    (async () => {
      const res = await getGameApi(gameId);
      if (res?.status === "success") {
        const g = res.game;
        setGame(g);
        setQuestions(g.mathQuestions || []);
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

  // Timer
  useEffect(() => {
    if (gameOver || showResult || !questions.length) return;
    setTimer(TIMER_SECONDS);
    hasAnsweredRef.current = false;

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!hasAnsweredRef.current) submitAnswer("", true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQ, gameOver, questions.length]);

  // Focus input on new question
  useEffect(() => {
    if (!showResult && inputRef.current) inputRef.current.focus();
  }, [currentQ, showResult]);

  // Socket listeners
  useEffect(() => {
    const onOppAnswer = (data) => {
      if (data.gameId !== gameId) return;
      setOppAnswered(true);
      if (data.isCorrect) setOppScore((s) => s + 1);
    };

    const onNextQ = (data) => {
      if (data.gameId !== gameId) return;
      setCurrentQ(data.questionIndex);
      setAnswer("");
      setSubmitted(false);
      setShowResult(false);
      setMyCorrect(null);
      setOppAnswered(false);
      hasAnsweredRef.current = false;
    };

    const onMathOver = (data) => {
      if (data.gameId !== gameId) return;
      // Opponent triggered game-over; sync scores for display
      setMyScore(data.oppFinalScore);
      setOppScore(data.myFinalScore);
    };

    const onFinished = (data) => {
      if (data.gameId !== gameId) return;
      setGameOver(true);
      if (data.isDraw) setGameResult("draw");
      else if (data.winnerId === user?._id) setGameResult("win");
      else setGameResult("lose");
    };

    socket.on("mathAnswerReceived", onOppAnswer);
    socket.on("mathNextQuestionReceived", onNextQ);
    socket.on("mathGameOverReceived", onMathOver);
    socket.on("gameFinishedReceived", onFinished);
    return () => {
      socket.off("mathAnswerReceived", onOppAnswer);
      socket.off("mathNextQuestionReceived", onNextQ);
      socket.off("mathGameOverReceived", onMathOver);
      socket.off("gameFinishedReceived", onFinished);
    };
  }, [gameId, user?._id]);

  const submitAnswer = (val, timedOut = false) => {
    if (hasAnsweredRef.current || gameOver) return;
    hasAnsweredRef.current = true;
    clearInterval(timerRef.current);

    const q = questions[currentQ];
    const numVal = Number(val || answer);
    const isCorrect = !timedOut && numVal === q?.answer;

    setSubmitted(true);
    setShowResult(true);
    setMyCorrect(isCorrect);

    if (isCorrect) setMyScore((s) => s + 1);

    socket.emit("mathAnswer", {
      gameId,
      opponentId: opponent?._id,
      playerId: user?._id,
      questionIndex: currentQ,
      isCorrect,
      time: TIMER_SECONDS - timer,
    });
  };

  const goToNext = () => {
    const nextQ = currentQ + 1;
    if (nextQ >= questions.length) {
      const finalMy = myScore;
      const finalOpp = oppScore;
      socket.emit("mathGameOver", {
        gameId,
        opponentId: opponent?._id,
        myFinalScore: finalOpp,
        oppFinalScore: finalMy,
      });
      finishTheGame(finalMy, finalOpp);
      return;
    }

    socket.emit("mathNextQuestion", {
      gameId,
      opponentId: opponent?._id,
      questionIndex: nextQ,
    });

    setCurrentQ(nextQ);
    setAnswer("");
    setSubmitted(false);
    setShowResult(false);
    setMyCorrect(null);
    setOppAnswered(false);
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
      socket.emit("gameFinished", { gameId, opponentId: opponent?._id, winnerId, isDraw });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !submitted) submitAnswer();
  };

  if (!game || !questions.length) {
    return (
      <div className="game-page">
        <TopNav />
        <div className="game-container" style={{ textAlign: "center", paddingTop: "100px" }}>
          <div style={{ color: "#999" }}>Loading game...</div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQ];

  return (
    <div className="game-page">
      <TopNav />
      <div className="game-container">
        <div className="game-header">
          <h1>Math <span>Battle</span></h1>
          <div className="game-info-bar">
            <span>Question <b style={{ color: "#62f7c7" }}>{currentQ + 1}/{questions.length}</b></span>
            {game.betCoins > 0 && (
              <span className="bet-info"><i className="fa fa-coins"></i> {game.betCoins} coins bet</span>
            )}
          </div>
        </div>

        <div className="math-container">
          {/* Scores */}
          <div className="quiz-scores" style={{ marginBottom: "24px" }}>
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

          {/* Timer */}
          <div className="quiz-timer-bar">
            <div className="quiz-timer-fill" style={{ width: `${(timer / TIMER_SECONDS) * 100}%`, background: timer <= 5 ? "#ff6b6b" : "#62f7c7" }} />
          </div>
          <div style={{ textAlign: "center", fontSize: "13px", color: timer <= 5 ? "#ff6b6b" : "#999", marginBottom: "20px" }}>
            {timer}s remaining
          </div>

          {/* Question */}
          <div className="math-question-card">
            <div className="math-equation">{currentQuestion?.question}</div>
          </div>

          {/* Answer input */}
          {!showResult ? (
            <div className="math-answer-area">
              <input
                ref={inputRef}
                type="number"
                className="math-input"
                placeholder="Your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={submitted}
              />
              <button
                className="send-invite-btn"
                style={{ width: "auto", padding: "10px 30px", marginTop: "10px" }}
                onClick={() => submitAnswer()}
                disabled={submitted || !answer}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="math-result-area">
              <div style={{
                fontSize: "18px", fontWeight: "700", textAlign: "center",
                color: myCorrect ? "#62f7c7" : "#ff6b6b",
              }}>
                {myCorrect ? "✓ Correct!" : `✗ Wrong! Answer: ${currentQuestion?.answer}`}
              </div>
              <div style={{ textAlign: "center", marginTop: "15px" }}>
                <button className="send-invite-btn" style={{ width: "auto", padding: "10px 30px" }} onClick={goToNext}>
                  {currentQ + 1 >= questions.length ? "Finish Game" : "Next Question →"}
                </button>
              </div>
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

export default MathBattleGame;
