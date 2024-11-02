import React from 'react'
import JobCard from './JobCard';

const AllJobs = () => {
  return (
    <div className='all-jobs-section box-shadow'>
        <div className="all-jobs-search-input">
            <input type="text" placeholder='Search people, jobs & more...' />
            <i className="fa fa-search"></i>
        </div>
        <ul className="all-jobs-filters">
            <li className='active'>Jobs</li>
            <li className=''>Freelancers</li>
            <li className=''>My Jobs</li>
        </ul>
        <div className="all-jobs-grid">
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        </div>
    </div>
  )
}

export default AllJobs;