import React, { useEffect, useState } from "react";
import NetworkCard from "../network/NetworkCard";
import { getUsers, getLoggedinUser } from "../../helper/apis";

const ProfileNetwork = ({ user }) => {
  const [connections, setConnections] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const currentUser = await getLoggedinUser();
      setLoggedInUser(currentUser);

      const allUsers = await getUsers();
      // Filter to only show the profile user's connections
      if (user?.connections?.length > 0) {
        const connectionIds = user.connections.map((c) =>
          typeof c === "object" ? c._id : c
        );
        const filtered = allUsers?.filter((u) =>
          connectionIds.includes(u._id)
        );
        setConnections(filtered || []);
      } else {
        setConnections([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const filteredConnections = search
    ? connections.filter(
        (c) =>
          c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          c.headline?.toLowerCase().includes(search.toLowerCase())
      )
    : connections;

  return (
    <div className="all-jobs-section box-shadow mt-10">
      <div className="all-jobs-search-input">
        <input
          type="text"
          placeholder="Search connections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="fa fa-search"></i>
      </div>
      <br />
      {filteredConnections.length > 0 ? (
        <div className="all-jobs-grid">
          {filteredConnections.map((conn) => (
            <NetworkCard
              key={conn._id}
              use={conn}
              loggedInUser={loggedInUser}
              refreshUsers={fetchData}
            />
          ))}
        </div>
      ) : (
        <div className="noposts-text">No connections yet</div>
      )}
    </div>
  );
};

export default ProfileNetwork;
