import React from "react";
import JobsFilters from "./JobsFilters";

const JobsLeft = ({ filters, setFilters, onApply }) => {
  return (
    <div className="jobs-left-section">
      <div className="jobs-filters">
        <JobsFilters filters={filters} setFilters={setFilters} onApply={onApply} />
      </div>
    </div>
  );
};

export default JobsLeft;
