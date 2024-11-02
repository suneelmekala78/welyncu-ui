import React from 'react'

const ExperienceDCard = () => {
  return (
    <>
      <div className="personal-details-card box-shadow">
        <div className="pdt"></div>
        <div className="personal-details-form p-15">
          <div className="personal-details-titles">
            <h2>Professional Experience</h2>
            <p>Add your previous job experiences</p>
          </div>
          <div className="personal-inputs">
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="role">Position Title</label>
                <input type="text" id="role" />
              </div>
              <div className="personal-input">
                <label htmlFor="cname">Company Name</label>
                <input type="text" id="cname" />
              </div>
            </div>
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="etype">Employment type</label>
                <input type="text" id="etype" />
              </div>
              <div className="personal-input">
                <label htmlFor="ltype">Location type</label>
                <input type="text" id="ltype" />
              </div>
            </div>
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="fdate">From Date</label>
                <input type="text" id="fdate" />
              </div>
              <div className="personal-input">
                <label htmlFor="todate">To Date</label>
                <input type="text" id="todate" />
              </div>
            </div>
            <div className="personal-input">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" />
            </div>
            <div className="personal-input">
              <label htmlFor="summery">Summery</label>
              <input type="text" id="summery" />
            </div>
            <div className="resume-bottom-btns">
                <div className="experience-bottom-btns">
                  <div className="exp-btn"><i className="fa fa-plus"></i> Add Experience</div>
                  <div className="exp-btn"><i className="fa fa-minus"></i> Remove</div>
                </div>
                <div className="resume-btn btn-background">Save</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExperienceDCard;