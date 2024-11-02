import React, { useEffect, useState } from "react";
import { getUsers } from "../../helper/apis";
import { Link } from "react-router-dom";
import AllFrdsSuggesions from "./AllFrdsSuggesions";

const FriendsCard = () => {
  const [viewAll, setViewAll] = useState(false);
  const [suggesions, setSuggesions] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setSuggesions(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="friends-card-section box-shadow">
        <div className="friends-card-title">People you might know</div>
        <div className="friends-card-all-friends">
          {suggesions?.slice(0, 5)?.map((frd, index) => (
            <div className="friends-card-friend" key={index}>
              <span>
                <div className="friends-card-friend-img">
                  <img src={frd?.profileUrl} alt="profile-pic" />
                </div>
                <Link
                  to={`/profile/${frd?._id}`}
                  className="friends-card-friend-titles"
                >
                  <b className="frd-name">{frd?.fullName}</b>
                  <span className="frd-headline">{frd?.headline}</span>
                </Link>
              </span>
              <div className="friends-card-friend-requist">
                <i className="fa fa-user-plus"></i>
              </div>
            </div>
          ))}
        </div>
        <div className="btn" onClick={() => setViewAll(true)}>
          See more
        </div>
      </div>

      {viewAll && (
        <AllFrdsSuggesions suggesions={suggesions} setViewAll={setViewAll} />
      )}
    </>
  );
};

export default FriendsCard;
