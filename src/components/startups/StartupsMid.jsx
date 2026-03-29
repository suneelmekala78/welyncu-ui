import React from "react";
import StartupCard from "./StartupCard";

const StartupsMid = ({ startups, search, setSearch, onSearch, tab, setTab, sort, setSort, onUpvote }) => {
  return (
    <div className="startups-mid-section box-shadow">
      <div className="startups-search-bar">
        <input
          type="text"
          placeholder="Search startups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <i className="fa fa-search" onClick={onSearch}></i>
      </div>

      <ul className="startups-tabs">
        <li
          className={tab === "all" ? "active" : ""}
          onClick={() => setTab("all")}
        >
          All Startups
        </li>
        <li
          className={tab === "mine" ? "active" : ""}
          onClick={() => setTab("mine")}
        >
          My Startups
        </li>
      </ul>

      <div className="startups-sort-bar">
        <span>{startups.length} startup{startups.length !== 1 ? "s" : ""} found</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      <div className="startups-grid">
        {startups.length > 0 ? (
          startups.map((s) => (
            <StartupCard key={s._id} startup={s} onUpvote={onUpvote} />
          ))
        ) : (
          <div className="empty-startups">
            <i className="fa fa-rocket"></i>
            <p>No startups found. Be the first to showcase yours!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupsMid;
