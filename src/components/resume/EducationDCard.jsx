import React from 'react'

const EducationDCard = () => {
  return (
    <>
      <div className="personal-details-card box-shadow">
        <div className="pdt"></div>
        <div className="personal-details-form p-15">
          <div className="personal-details-titles">
            <h2>Education Details</h2>
            <p>Add your education details</p>
          </div>
          <div className="personal-inputs">
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="role">Degree Title</label>
                <input type="text" id="role" />
              </div>
              <div className="personal-input">
                <label htmlFor="cname">College Name</label>
                <input type="text" id="cname" />
              </div>
            </div>
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="etype">Field of study</label>
                <input type="text" id="etype" />
              </div>
              <div className="personal-input">
                <label htmlFor="ltype">Grade</label>
                <input type="text" id="ltype" />
              </div>
            </div>
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="fdate">Start Date</label>
                <input type="text" id="fdate" />
              </div>
              <div className="personal-input">
                <label htmlFor="todate">End Date</label>
                <input type="text" id="todate" />
              </div>
            </div>
            <div className="personal-input">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" />
            </div>
            <div className="personal-input">
              <label htmlFor="summery">Description</label>
              <input type="text" id="summery" />
            </div>
            <div className="resume-bottom-btns">
                <div className="experience-bottom-btns">
                  <div className="exp-btn"><i className="fa fa-plus"></i> Add Education</div>
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

export default EducationDCard;