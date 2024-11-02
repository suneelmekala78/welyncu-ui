import React from 'react'

const SkillsDCard = () => {
  return (
    <>
      <div className="personal-details-card box-shadow">
        <div className="pdt"></div>
        <div className="personal-details-form p-15">
          <div className="personal-details-titles">
            <h2>Skills </h2>
            <p>Add your top professional key skills</p>
          </div>
          <div className="personal-inputs">
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="role">Skill</label>
                <input type="text" id="role" />
              </div>
              <div className="skill-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
            </div>
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="role">Skill</label>
                <input type="text" id="role" />
              </div>
              <div className="skill-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
            </div>
            <div className="personal-flex-inputs">
              <div className="personal-input">
                <label htmlFor="role">Skill</label>
                <input type="text" id="role" />
              </div>
              <div className="skill-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
            </div>
    
            <div className="resume-bottom-btns">
                <div className="experience-bottom-btns">
                  <div className="exp-btn"><i className="fa fa-plus"></i> Add skill</div>
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

export default SkillsDCard;