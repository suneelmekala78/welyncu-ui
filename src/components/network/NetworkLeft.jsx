import React, { useEffect, useState } from "react";
import NetworkCard from "./NetworkCard";
import NetworkReqiests from "./NetworkReqiests";
import { getUsers } from "../../helper/apis";

const NetworkLeft = ({ user }) => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="network-left-section">
      <div className="all-jobs-section box-shadow">
        <div className="all-jobs-search-input">
          <input type="text" placeholder="Search people, jobs & more..." />
          <i className="fa fa-search"></i>
        </div>
        <NetworkReqiests user={user} />
        <ul className="all-jobs-filters">
          <li className="active">People</li>
          <li className="">Pages</li>
          <li className="">Groups</li>
        </ul>
        <div className="all-jobs-grid">
          {users?.map(
            (use, i) => use?._id !== user?._id && <NetworkCard use={use} key={i} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkLeft;
