import React from 'react'
import JobDetailsOverview from './JobDetailsOverview'
import JobDetailsDesc from './JobDetailsDesc'

const JobDetailsMid = ({ job }) => {
  return (
    <div className='job-details-mid-section'>
        <JobDetailsOverview job={job} />
        <JobDetailsDesc job={job} />
    </div>
  )
}

export default JobDetailsMid