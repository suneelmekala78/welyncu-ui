import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className='job-card box-shadow'>
        <div className="job-card-top">
            <div className="job-card-top-left">
                <b className='job-title'>{job?.title}</b>
                <span className='job-company-name'>{job?.company}</span>
                <span className='job-company-location'><i className="fa fa-location-dot"></i> {job?.location}</span>
            </div>
            <div className="job-card-top-right">
                <img src={job?.companyLogo || "https://i.pinimg.com/736x/83/c9/41/83c94112d672a379a30f5f9bb6a5e948--symbols.jpg"} alt="company-logo" />
            </div>
        </div>

        <div className="job-card-mid">
            <div className="job-mid-left"><i className="fa fa-clock"></i> {timeAgo(job?.createdAt)}</div>
            <div className="job-mid-left"><i className="fa fa-user-group"></i> {job?.applications?.length || 0} applications</div>
        </div>

        <div className="job-card-btns">
            <div className="job-card-btn apply-btn btn-background" onClick={() => navigate(`/job/${job?._id}`)}>Apply Now</div>
            <div className="job-card-btn view-btn" onClick={() => navigate(`/job/${job?._id}`)}>View Details</div>
        </div>
    </div>
  )
}

export default JobCard;