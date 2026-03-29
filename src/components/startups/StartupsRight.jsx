import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStartupsApi } from "../../helper/apis";

const StartupsRight = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await getStartupsApi("sort=upvotes");
      const list = res?.startups || [];
      setTrending(list.slice(0, 5));
    };
    fetchTrending();
  }, []);

  return (
    <>
      <div className="startups-showcase-btn box-shadow">
        <button
          className="showcase-add-btn"
          onClick={() => navigate("/create-startup")}
        >
          <i className="fa fa-rocket"></i> Showcase Your Startup
        </button>
        <p>Get discovered by investors, co-founders & the community</p>
      </div>

      {trending.length > 0 && (
        <div className="startups-trending box-shadow" style={{ marginTop: 10 }}>
          <div className="trending-title">
            <i className="fa fa-fire"></i> Trending Startups
          </div>
          {trending.map((s) => (
            <div
              key={s._id}
              className="trending-startup-item"
              onClick={() => navigate(`/startup/${s._id}`)}
            >
              <img src={s.logo} alt={s.name} />
              <div className="trending-startup-info">
                <b>{s.name}</b>
                <span>
                  {s.upvotes?.length || 0} upvotes &middot; {s.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StartupsRight;
