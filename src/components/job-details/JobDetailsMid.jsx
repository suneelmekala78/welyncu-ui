import React from 'react'
import JobDetailsOverview from './JobDetailsOverview'
import JobDetailsDesc from './JobDetailsDesc'

const JobDetailsMid = () => {
  return (
    <div className='job-details-mid-section'>
        <JobDetailsOverview/>
        <JobDetailsDesc/>
    </div>
  )
}

export default JobDetailsMid