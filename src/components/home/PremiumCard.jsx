import React from 'react'

const PremiumCard = () => {
  return (
    <div className='premium-card-section box-shadow'>
        <div className="premium-card-img">
            <img src="https://welyncu-uploads.s3.amazonaws.com/uploads/1771342137081_Brix.png" alt="premium-img" />
        </div>
        <div className="premium-card-bottom">
            <b className="title">WeLink Premium</b>
            <span>Grow & nurture your network</span>
        </div>
        <div className="premium-btn">Active</div>
    </div>
  )
}

export default PremiumCard;