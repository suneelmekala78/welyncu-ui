import React from 'react'

const PremiumCard = () => {
  return (
    <div className='premium-card-section box-shadow'>
        <div className="premium-card-img">
            <img src="https://media.licdn.com/dms/image/C5112AQETldKI3wZhyQ/article-cover_image-shrink_600_2000/0/1520123831352?e=2147483647&v=beta&t=eXfLfdAgeMXY8UJsG4e55lY6EKC8p4jLs5kWxuUmkWk" alt="premium-img" />
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