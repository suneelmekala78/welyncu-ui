import React, { useEffect, useState } from "react";
import NetworkCard from "./NetworkCard";
import NetworkReqiests from "./NetworkReqiests";
import { getUsers, getLoggedinUser } from "../../helper/apis";

const NetworkLeft = ({ user, getUserData, initialSearch }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const getAllUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res || []);
      setFilteredUsers(res || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLoggedInUser = async () => {
    try {
      const res = await getLoggedinUser();
      setLoggedInUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshUsers = async () => {
    await Promise.all([getAllUsers(), fetchLoggedInUser()]);
  };

  useEffect(() => {
    getAllUsers();
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u?.fullName?.toLowerCase().includes(query) ||
            u?.headline?.toLowerCase().includes(query) ||
            u?.city?.toLowerCase().includes(query) ||
            u?.country?.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, users]);

  return (
    <div className="network-left-section">
      <div className="all-jobs-section box-shadow">
        <div className="all-jobs-search-input">
          <input
            type="text"
            placeholder="Search people by name, headline, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </div>
        <NetworkReqiests getUserData={getUserData} onAccept={refreshUsers} />
        <ul className="all-jobs-filters">
          <li className="active">People</li>
        </ul>
        <div className="all-jobs-grid">
          {filteredUsers?.map(
            (use, i) =>
              use?._id !== user?._id && (
                <NetworkCard
                  use={use}
                  key={i}
                  loggedInUser={loggedInUser}
                  refreshUsers={refreshUsers}
                />
              )
          )}
          {filteredUsers?.filter((u) => u?._id !== user?._id).length === 0 && (
            <div style={{ padding: "20px", color: "#808080" }}>
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkLeft;
