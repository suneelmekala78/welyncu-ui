import React from 'react'

const CompaniesCard = () => {
  return (
    <div className='friends-card-section companies-card box-shadow'>
        <div className="friends-card-title">Similar pages</div>
        <div className="friends-card-all-friends">
            <div className="friends-card-friend">
                <span>
                <div className="friends-card-friend-img">
                    <img src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png" alt="profile-pic" />
                </div>
                <div className="friends-card-friend-titles">
                    <b>Google</b>
                    <span>IT</span>
                </div>
                </span>
                <div className="friends-card-friend-requist">
                    <i className="fa fa-plus"></i> Follow
                </div>
            </div>
            <div className="friends-card-friend">
                <span>
                <div className="friends-card-friend-img">
                    <img src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png" alt="profile-pic" />
                </div>
                <div className="friends-card-friend-titles">
                    <b>Facebook</b>
                    <span>Social Media</span>
                </div>
                </span>
                <div className="friends-card-friend-requist">
                    <i className="fa fa-plus"></i> Follow
                </div>
            </div>
            <div className="friends-card-friend">
                <span>
                <div className="friends-card-friend-img">
                    <img src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png" alt="profile-pic" />
                </div>
                <div className="friends-card-friend-titles">
                    <b>Mekala Suneel</b>
                    <span> Full Stack Developer</span>
                </div>
                </span>
                <div className="friends-card-friend-requist">
                    <i className="fa fa-plus"></i> Follow
                </div>
            </div>
            <div className="friends-card-friend">
                <span>
                <div className="friends-card-friend-img">
                    <img src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png" alt="profile-pic" />
                </div>
                <div className="friends-card-friend-titles">
                    <b>Mekala Suneel</b>
                    <span> Full Stack Developer</span>
                </div>
                </span>
                <div className="friends-card-friend-requist">
                    <i className="fa fa-plus"></i> Follow
                </div>
            </div>
        </div>
        <div className="btn">See more</div>
    </div>
  )
}

export default CompaniesCard;