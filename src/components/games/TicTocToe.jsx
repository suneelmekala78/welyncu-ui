import React from "react";
import "./games.css";
import TopNav from "../topnav/TopNav";


const TicTocToe = () => {
  // const initialBoard = Array(9).fill(null);
  return (
    <div className="tic-toc-toe-page">
      <TopNav />
      <div className="tic-toc-toe-section">
        <div className="tic-toc-toe-section-top">
          <h1 className="tic-toc-toe-title">
            Tic Tac Toe <span>Game</span>
          </h1>
        </div>
        <div className="tic-toc-toe-section-bottom"> 
          <div className="tic-toc-toe-section-bottom-left">
            <div className="player-card">
              <div className="player-card-top">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
                  alt="profile-pic"
                />
                <div className="titles">
                  <b>Elon Musk</b>
                  <span>Online</span>
                </div>
              </div>
              <div className="player-card-bottom">
                <b>wins: 1</b>
              </div>
            </div>
          </div>
          <div className="tic-toc-toe-section-bottom-mid">
            <h2>Round 2/5</h2>
            <div className="boxes">
              <div className="boxes-row">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <div className="boxes-row">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <div className="boxes-row">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
            </div>
            <button className="play-again-btn">Play Again</button>
          </div>
          <div className="tic-toc-toe-section-bottom-right">
            <div className="player-card">
              <div className="player-card-top">
                <img
                  src="https://th.bing.com/th/id/OIP.Afk9XWKAozdV1F0NBdd4SgAAAA?rs=1&pid=ImgDetMain"
                  alt="profile-pic"
                />
                <div className="titles">
                  <b>Mark Zuckerberg</b>
                  <span>Online</span>
                </div>
              </div>
              <div className="player-card-bottom">
                <b>wins: 1</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  //   const [board, setBoard] = useState(initialBoard);
  //   const [isXNext, setIsXNext] = useState(true);
  //   const [winner, setWinner] = useState(null);
  //   const [room, setRoom] = useState("");
  //   const [player, setPlayer] = useState("X");
  //   const [opponentJoined, setOpponentJoined] = useState(false);

  //   useEffect(() => {
  //     const savedRoom = window.localStorage.getItem("tic-tac-toe-room");
  //     if (savedRoom) {
  //       setRoom(savedRoom);
  //     }
  //   }, []);

  //   const handleClick = (index) => {
  //     if (board[index] || winner || !opponentJoined) return;

  //     const newBoard = board.slice();
  //     newBoard[index] = isXNext ? "X" : "O";
  //     setBoard(newBoard);
  //     setIsXNext(!isXNext);

  //     // Save to local storage for multiplayer
  //     window.localStorage.setItem(
  //       room,
  //       JSON.stringify({ board: newBoard, nextTurn: !isXNext })
  //     );
  //   };

  //   const handleRoomJoin = (e) => {
  //     e.preventDefault();
  //     const savedRoom = window.localStorage.getItem(room);
  //     if (savedRoom) {
  //       const { board: savedBoard, nextTurn } = JSON.parse(savedRoom);
  //       setBoard(savedBoard);
  //       setIsXNext(nextTurn);
  //     }
  //     setPlayer(isXNext ? "X" : "O");
  //     setOpponentJoined(true);
  //     window.localStorage.setItem("tic-tac-toe-room", room);
  //   };

  //   const resetGame = () => {
  //     setBoard(initialBoard);
  //     setIsXNext(true);
  //     setWinner(null);
  //     window.localStorage.removeItem(room);
  //   };

  //   const checkWinner = () => {
  //     const lines = [
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //       [0, 3, 6],
  //       [1, 4, 7],
  //       [2, 5, 8],
  //       [0, 4, 8],
  //       [2, 4, 6],
  //     ];

  //     for (let i = 0; i < lines.length; i++) {
  //       const [a, b, c] = lines[i];
  //       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
  //         setWinner(board[a]);
  //         return;
  //       }
  //     }

  //     if (!board.includes(null)) {
  //       setWinner("Draw");
  //     }
  //   };

  //   useEffect(() => {
  //     checkWinner();
  //   }, [board]);

  //   return (
  //     <div className="App">
  //       <h1>Multiplayer Tic-Tac-Toe</h1>
  //       <form onSubmit={handleRoomJoin}>
  //         <input
  //           type="text"
  //           value={room}
  //           onChange={(e) => setRoom(e.target.value)}
  //           placeholder="Enter Room ID"
  //         />
  //         <button type="submit">Join Room</button>
  //       </form>

  //       {opponentJoined ? (
  //         <div>
  //           <h2>
  //             {winner
  //               ? `Winner: ${winner}`
  //               : `Next Player: ${isXNext ? "X" : "O"}`}
  //           </h2>
  //           <div className="board">
  //             {board.map((value, index) => (
  //               <button
  //                 key={index}
  //                 className="square"
  //                 onClick={() => handleClick(index)}
  //               >
  //                 {value}
  //               </button>
  //             ))}
  //           </div>
  //           <button onClick={resetGame}>Reset Game</button>
  //         </div>
  //       ) : (
  //         <h2>Waiting for opponent to join...</h2>
  //       )}
  //     </div>
  //   );
};

export default TicTocToe;
