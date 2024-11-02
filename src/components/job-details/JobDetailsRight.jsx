import React from 'react'
import JobAlertBtn from './JobAlertBtn';
import SimilarJobs from './SimilarJobs';

const JobDetailsRight = () => {
  return (
    <div className='job-details-right-section'>
        <JobAlertBtn/>
        <SimilarJobs/>
    </div>
  )
}

export default JobDetailsRight;