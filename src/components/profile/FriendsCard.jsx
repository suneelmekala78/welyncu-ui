import React, { useEffect, useState } from "react";
import { getUsers, apiRequest, getLoggedinUser } from "../../helper/apis";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AllFrdsSuggesions from "./AllFrdsSuggesions";

const FriendsCard = () => {
  const [viewAll, setViewAll] = useState(false);
  const [suggesions, setSuggesions] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const refresh = async () => {
    const [users, me] = await Promise.all([getUsers(), getLoggedinUser()]);
    setSuggesions(users || []);
    setLoggedInUser(me);
  };

  useEffect(() => { refresh(); }, []);

  const handleConnect = async (targetUserId) => {
    try {
      const isPending = loggedInUser?.sendedConnectionRequests?.includes(targetUserId);
      const isConnected = loggedInUser?.connections?.includes(targetUserId);
      if (isConnected) return;
      if (isPending) {
        const res = await apiRequest({ url: "/user/withdraw-connection-requist", data: { targetUserId }, method: "POST" });
        if (res?.status === "success") { toast.success(res?.message); refresh(); } else toast.error(res?.message);
      } else {
        const res = await apiRequest({ url: "/user/send-connection-requist", data: { targetUserId }, method: "POST" });
        if (res?.status === "success") { toast.success(res?.message); refresh(); } else toast.error(res?.message);
      }
    } catch (error) { console.log(error); }
  };

  const getConnectLabel = (frdId) => {
    if (loggedInUser?.connections?.includes(frdId)) return { icon: "fa fa-user-check", label: "Connected" };
    if (loggedInUser?.sendedConnectionRequests?.includes(frdId)) return { icon: "fa fa-clock", label: "Pending" };
    return { icon: "fa fa-user-plus", label: "" };
  };

  return (
    <>
      <div className="friends-card-section box-shadow">
        <div className="friends-card-title">People you might know</div>
        <div className="friends-card-all-friends">
          {suggesions?.slice(0, 5)?.map((frd, index) => (
            <div className="friends-card-friend" key={index}>
              <span>
                <div className="friends-card-friend-img">
                  <img src={frd?.profileUrl || "https://media.licdn.com/dms/image/v2/D5603AQGuDYgKvZkiBQ/profile-displayphoto-shrink_800_800/B56Zbx5MDoH0Ag-/0/1747815023369?e=1762992000&v=beta&t=saGrbIn_ggVk8Y11sd3HUVk38BiLvs60UD2zEgIJ_RA"} alt="profile-pic" />
                </div>
                <Link
                  to={`/profile/${frd?._id}`}
                  className="friends-card-friend-titles"
                >
                  <b className="frd-name">{frd?.fullName}</b>
                  <span className="frd-headline">{frd?.headline}</span>
                </Link>
              </span>
              <div className="friends-card-friend-requist" onClick={() => handleConnect(frd?._id)} style={{cursor: "pointer"}}>
                <i className={getConnectLabel(frd?._id).icon}></i> {getConnectLabel(frd?._id).label}
              </div>
            </div>
          ))}
        </div>
        <div className="btn" onClick={() => setViewAll(true)}>
          See more
        </div>
      </div>

      {viewAll && (
        <AllFrdsSuggesions suggesions={suggesions} setViewAll={setViewAll} loggedInUser={loggedInUser} onConnect={handleConnect} />
      )}
    </>
  );
};

export default FriendsCard;
