import React from 'react'

const JobCard = () => {
  return (
    <div className='job-card box-shadow'>
        <div className="job-card-top">
            <div className="job-card-top-left">
                <b className='job-title'>UI/UX Designer</b>
                <span className='job-company-name'>Envanto</span>
                <span className='job-company-location'><i className="fa fa-location-dot"></i> Hyderabad, TS</span>
            </div>
            <div className="job-card-top-right">
                <img src="https://i.pinimg.com/736x/83/c9/41/83c94112d672a379a30f5f9bb6a5e948--symbols.jpg" alt="company-logo" />
            </div>
        </div>

        <div className="job-card-mid">
            <div className="job-mid-left"><i className="fa fa-clock"></i> 3 days ago</div>
            <div className="job-mid-left"><i className="fa fa-user-group"></i> 15 applications</div>
        </div>

        <div className="job-card-btns">
            <div className="job-card-btn apply-btn btn-background">Apply Now</div>
            <div className="job-card-btn view-btn">View Details</div>
        </div>
    </div>
  )
}

export default JobCard;