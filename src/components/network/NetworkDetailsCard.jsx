import React, { useEffect, useState } from "react";
import { getConnectionsList, getFollowingPagesApi } from "../../helper/apis";
import { useDispatch } from "react-redux";

const NetworkDetailsCard = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    connectionsCount: 0,
    followersCount: 0,
    pagesCount: 0,
  });

  const fetchStats = async () => {
    try {
      const [connRes, pagesRes] = await Promise.all([
        getConnectionsList(dispatch),
        getFollowingPagesApi(),
      ]);
      setStats({
        connectionsCount: connRes?.connectionsCount || 0,
        followersCount: connRes?.followersCount || 0,
        pagesCount: pagesRes?.pages?.length || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="network-details-card box-shadow">
      <div className="network-details-title">Manage my network</div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-user-group"></i> Connections
        </div>{" "}
        <div className="details-num">{stats.connectionsCount}</div>
      </div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-user-plus"></i> Followers
        </div>{" "}
        <div className="details-num">{stats.followersCount}</div>
      </div>
      <div className="network-details-item">
        <div className="ndi-left">
          <i className="fa fa-list"></i> Pages
        </div>{" "}
        <div className="details-num">{stats.pagesCount}</div>
      </div>
    </div>
  );
};

export default NetworkDetailsCard;
