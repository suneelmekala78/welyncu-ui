import React, { useState, useEffect } from "react";
import "../components/startups/startups.css";
import TopNav from "../components/topnav/TopNav";
import StartupsLeft from "../components/startups/StartupsLeft";
import StartupsMid from "../components/startups/StartupsMid";
import StartupsRight from "../components/startups/StartupsRight";
import { getStartupsApi, getMyStartupsApi } from "../helper/apis";

const Startups = () => {
  const [startups, setStartups] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({ category: "", stage: "", funding: "" });

  const fetchStartups = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (filters.category) params.append("category", filters.category);
    if (filters.stage) params.append("stage", filters.stage);
    if (filters.funding) params.append("funding", filters.funding);
    if (sort) params.append("sort", sort);

    const res = await getStartupsApi(params.toString());
    setStartups(res?.startups || []);
  };

  const fetchMyStartups = async () => {
    const res = await getMyStartupsApi();
    setStartups(res?.startups || []);
  };

  useEffect(() => {
    if (tab === "all") fetchStartups();
    else fetchMyStartups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, sort]);

  const onSearch = () => {
    if (tab === "all") fetchStartups();
  };

  const onApply = () => {
    if (tab === "all") fetchStartups();
  };

  const handleUpvote = (id) => {
    setStartups((prev) =>
      prev.map((s) => {
        if (s._id !== id) return s;
        const userId = JSON.parse(localStorage.getItem("user") || "{}")?._id;
        const already = s.upvotes?.some((u) => (u._id || u) === userId);
        return {
          ...s,
          upvotes: already
            ? s.upvotes.filter((u) => (u._id || u) !== userId)
            : [...(s.upvotes || []), userId],
        };
      })
    );
  };

  return (
    <>
      <TopNav />
      <div className="startups-page">
        <div className="startups-left">
          <StartupsLeft filters={filters} setFilters={setFilters} onApply={onApply} />
        </div>
        <div className="startups-middle">
          <StartupsMid
            startups={startups}
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
            tab={tab}
            setTab={setTab}
            sort={sort}
            setSort={setSort}
            onUpvote={handleUpvote}
          />
        </div>
        <div className="startups-right">
          <StartupsRight />
        </div>
      </div>
    </>
  );
};

export default Startups;
