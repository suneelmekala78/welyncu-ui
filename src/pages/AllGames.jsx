import React, { useState } from "react";
import '../components/games/games.css'
import TopNav from "../components/topnav/TopNav";
import InviteFriend from "../components/games/InviteFriend";
import WaitingCard from "../components/games/WaitingCard";

const AllGames = () => {
  const [invite, setInvite] = useState(false); 
  const [waiting, setWaiting] = useState(false);

  return (
    <>
      <TopNav />
      <div className="resumes-page all-games-page">
        <div className="resumes-top">
          <h1 className="resumes-title">Games Zone</h1>
          <div className="resumes-text">
            Play games with your friends and earn money.
          </div>
        </div>
        <div className="all-resumes">
          <div className="game-box" style={{ backgroundColor: "blueviolet" }}>
            <div className="game-box-top">
              <img
                src="https://th.bing.com/th/id/OIP.oD6RQEKXZWLh_EFSp4740QHaD3?rs=1&pid=ImgDetMain"
                alt="resume"
              />
            </div>
            <div className="game-box-bottom">
              <div className="resume-box-bottom-left">Quiz Game</div>
              <div className="resume-box-bottom-right">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>

          <div className="game-box" style={{ backgroundColor: "deeppink" }} onClick={() => setInvite(true)}>
            <div className="game-box-top">
              <img
                src="https://image.winudf.com/v2/image/Y29tLmZyZWVmdW5nYW1lcy50aWN0YWN0b2Uub25saW5lbXVsdGlwbGF5ZXJnYW1lc19zY3JlZW5fMTBfMTUyOTk3NzQ2Nl8wNzU/screen-10.jpg?fakeurl=1&type=.jpg"
                alt="resume"
              />
            </div>
            <div className="game-box-bottom">
              <div className="resume-box-bottom-left">Tic Tac Toe</div>
              <div className="resume-box-bottom-right">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>

          <div className="game-box" style={{ backgroundColor: "orange" }}>
            <div className="game-box-top">
              <img
                src="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/c/chess-classic-board-game-switch/hero"
                alt="resume"
              />
            </div>
            <div className="game-box-bottom">
              <div className="resume-box-bottom-left">Chess</div>
              <div className="resume-box-bottom-right">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {invite && <InviteFriend setInvite={setInvite}/>}
      {waiting && <WaitingCard setWaiting={setWaiting}/>}
    </>
  );
};

export default AllGames;
