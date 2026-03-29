import React from 'react'
import JobCard from './JobCard';

const AllJobs = ({ jobs, search, setSearch, onSearch, tab, setTab }) => {
  return (
    <div className='all-jobs-section box-shadow'>
        <div className="all-jobs-search-input">
            <input
              type="text"
              placeholder='Search people, jobs & more...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
            />
            <i className="fa fa-search" onClick={onSearch}></i>
        </div>
        <ul className="all-jobs-filters">
            <li className={tab === "jobs" ? "active" : ""} onClick={() => setTab("jobs")}>Jobs</li>
            <li className={tab === "my-jobs" ? "active" : ""} onClick={() => setTab("my-jobs")}>My Jobs</li>
        </ul>
        <div className="all-jobs-grid">
          {jobs?.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p style={{ padding: "15px", color: "#666" }}>No jobs found</p>
          )}
        </div>
    </div>
  )
}

export default AllJobs;