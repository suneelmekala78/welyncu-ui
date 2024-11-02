import React from 'react'

const JobPostQuestions = () => {
  return (
    <div className='job-post-questions job-post-details-section box-shadow p-15'>
      <div className="job-post-title">Post Job</div>
      <div className="job-post-details">
        {/* <div className="job-post-details-title">Screening questions :</div> */}
        <div className="job-post-details-container">
          <div className="personal-inputs">
            

            <div className="personal-input">
              <label htmlFor="job-title">Applications collection mail</label>
              <input type="text" id="job-title" placeholder='Ex. hr@welink.com'/>
            </div>

            <div className="job-post-details-title">Screening Questions :</div>
            <div className="job-post-details-skills">
                <div className="job-post-details-skill box-shadow">Experience <i className="fa fa-check"></i></div>
                <div className="job-post-details-skill box-shadow">Education <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Location <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Joining <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Visa <i className="fa fa-xmark"></i></div>
                <div className="job-post-details-skill box-shadow">Custom <i className="fa fa-xmark"></i></div>
            </div>

            <div className="job-post-secreening-question box-shadow p-15">
              <div className="screen-question">How many years of work experience do you have with [Skill]? <i className='fa fa-xmark'></i></div>
              <div className="screen-question-details">
                <div className="left">
                  <label htmlFor="sk">Skill</label>
                  <input id='sk' type="text" />
                </div>
                <div className="mid">
                <label htmlFor="ans">Answer (min)</label>
                <input id='ans' type="text" />
                </div>
                <div className="right">
                  <input type="checkbox" name="" id="" />
                  <span>Must needed</span>
                </div>
              </div>
            </div>
            <div className="job-post-secreening-question box-shadow p-15">
              <div className="screen-question">How many years of work experience do you have with [Skill]? <i className='fa fa-xmark'></i></div>
              <div className="screen-question-details">
                <div className="left">
                  <label htmlFor="sk">Skill</label>
                  <input id='sk' type="text" />
                </div>
                <div className="mid">
                <label htmlFor="ans">Answer (min)</label>
                <input id='ans' type="text" />
                </div>
                <div className="right">
                  <input type="checkbox" name="" id="" />
                  <span>Must needed</span>
                </div>
              </div>
            </div>
            <div className="job-post-secreening-question box-shadow p-15">
              <div className="screen-question">How many years of work experience do you have with [Skill]? <i className='fa fa-xmark'></i></div>
              <div className="screen-question-details">
                <div className="left">
                  <label htmlFor="sk">Skill</label>
                  <input id='sk' type="text" />
                </div>
                <div className="mid">
                <label htmlFor="ans">Answer (min)</label>
                <input id='ans' type="text" />
                </div>
                <div className="right">
                  <input type="checkbox" name="" id="" />
                  <span>Must needed</span>
                </div>
              </div>
            </div>

            <div className="post-mail-settings">
            <div className="job-post-details-title">Mail Settings :</div>
            <div className="personal-input">
              <label htmlFor="job-title">Rejection</label>
              <textarea name="mail" id=""></textarea>
            </div>
            <div className="personal-input">
              <label htmlFor="job-title">Shortlisted</label>
              <textarea name="mail" id=""></textarea>
            </div>
            <div className="personal-input">
              <label htmlFor="job-title">Hired</label>
              <textarea name="mail" id=""></textarea>
            </div>
            </div>

            <div className="resume-bottom-btns">
              <div className="resume-btn">Back</div>
              <div className="resume-btn btn-background">Post</div>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default JobPostQuestions;