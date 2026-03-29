import React from 'react'

const JobsFilters = ({ filters, setFilters, onApply }) => {
  const handleCheck = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  return (
    <div className='jobs-filter-card box-shadow'>
        <p className="filter-title">Filter Jobs</p>
        <div className="jobs-category-filter-section">
          <div className="category-title">Experience</div>
          <div className="categories-list">
            {["fresher", "1-3", "3-6", "6-12", "12+"].map((val) => (
              <div className="category-item" key={val}>
                <input type="checkbox" checked={filters.experience === val} onChange={() => handleCheck("experience", val)} /> {val === "fresher" ? "Fresher" : `${val} years`}
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-category-filter-section">
          <div className="category-title">Position Type</div>
          <div className="categories-list">
            {["full-time", "part-time", "contract", "freelance"].map((val) => (
              <div className="category-item" key={val}>
                <input type="checkbox" checked={filters.employmentType === val} onChange={() => handleCheck("employmentType", val)} /> {val.charAt(0).toUpperCase() + val.slice(1).replace("-", " ")}
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-category-filter-section">
          <div className="category-title">Workplace Type</div>
          <div className="categories-list">
            {["on-site", "remote", "hybrid"].map((val) => (
              <div className="category-item" key={val}>
                <input type="checkbox" checked={filters.jobType === val} onChange={() => handleCheck("jobType", val)} /> {val.charAt(0).toUpperCase() + val.slice(1).replace("-", " ")}
              </div>
            ))}
          </div>
        </div>
        <div className="resume-btn btn-background" style={{marginTop: "10px", textAlign: "center", cursor: "pointer"}} onClick={onApply}>Apply Filters</div>
    </div>
  )
}

export default JobsFilters;