import React from 'react'
import AllJobs from './AllJobs'

const JobsMid = ({ jobs, search, setSearch, onSearch, tab, setTab }) => {
  return (
    <>
    <div className="jobs-middle-section">
      <AllJobs jobs={jobs} search={search} setSearch={setSearch} onSearch={onSearch} tab={tab} setTab={setTab} />
    </div>
    </>
  )
}

export default JobsMid