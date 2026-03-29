import React from 'react'
import CompanyProfileCard from '../company/CompanyProfileCard';

const JobDetailsLeft = ({ job }) => {
  return (
    <div className='job-details-left-section'>
        <CompanyProfileCard company={job?.company} logo={job?.companyLogo} />
    </div>
  )
}

export default JobDetailsLeft;