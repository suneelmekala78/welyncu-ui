import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../components/network/network.css";
import NetworkLeft from "../components/network/NetworkLeft";
import NetworkRight from "../components/network/NetworkRight";
import TopNav from "../components/topnav/TopNav";
import { getLoggedinUser } from "../helper/apis";

const Network = () => {
  const [user, setUser] = useState({});
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const getUserData = async () => {
    const res = await getLoggedinUser();
    setUser(res);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <TopNav />
      <div className="network-page">
        <div className="network-left">
          <NetworkLeft user={user} getUserData={getUserData} initialSearch={initialSearch} />
        </div>
        <div className="network-right">
          <NetworkRight />
        </div>
      </div>
    </>
  );
};

export default Network;
