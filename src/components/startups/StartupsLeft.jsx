import React from "react";

const StartupsLeft = ({ filters, setFilters, onApply }) => {
  const categories = [
    "SaaS", "FinTech", "EdTech", "HealthTech", "E-Commerce", "AI/ML",
    "Social Media", "Gaming", "CleanTech", "FoodTech", "AgriTech",
    "Logistics", "Real Estate", "Travel", "Entertainment", "Cybersecurity",
    "IoT", "Blockchain", "Other",
  ];
  const stages = ["Idea", "MVP", "Early Traction", "Growth", "Scaling", "Profitable"];
  const fundingOptions = [
    "Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Profitable",
  ];

  return (
    <div className="startups-filter-card box-shadow">
      <div className="filter-title">Filter Startups</div>

      <div className="startups-filter-section">
        <div className="filter-label">Category</div>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="startups-filter-section">
        <div className="filter-label">Stage</div>
        <select
          value={filters.stage}
          onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
        >
          <option value="">All Stages</option>
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="startups-filter-section">
        <div className="filter-label">Funding</div>
        <select
          value={filters.funding}
          onChange={(e) => setFilters({ ...filters, funding: e.target.value })}
        >
          <option value="">All Funding</option>
          {fundingOptions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="startups-filter-section">
        <button className="filter-apply-btn" onClick={onApply}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default StartupsLeft;
