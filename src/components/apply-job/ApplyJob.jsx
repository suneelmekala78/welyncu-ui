import React, { useState } from "react";
import "./applyJob.css";
import { useSelector } from "react-redux";
import { applyToJobApi } from "../../helper/apis";
import { toast } from "react-toastify";

const ApplyJob = ({ job, setApply }) => {
  const user = useSelector((state) => state.user.user);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState(
    job?.screeningQuestions?.map((q) => ({ question: q.question, answer: "" })) || []
  );
  const [step, setStep] = useState(1);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => prev.map((a, i) => i === index ? { ...a, answer: value } : a));
  };

  const handleSubmit = async () => {
    const res = await applyToJobApi(job?._id, { email, phone, answers });
    if (res?.data?.status === "success") {
      toast.success("Application submitted!");
      setApply(false);
    } else {
      toast.error(res?.data?.message || "Failed to apply");
    }
  };

  return (
    <>
      <div className="apply-job-section">
        <div className="apply-job-container box-shadow p-15">
          <div className="apply-job-title">
            Apply for {job?.title} role{" "}
            <i className="fa fa-xmark" onClick={() => setApply(false)}></i>
          </div>

          {step === 1 && (
            <div className="apply-job-contact-section">
              <div className="apply-job-contact-section-top">
                <img src={user?.profileUrl || "https://via.placeholder.com/50"} alt="profile-pic" />
                <div className="details">
                  <div className="user-name">{user?.fullName}</div>
                  <div className="role">{user?.headline || ""}</div>
                </div>
              </div>
              <div className="personal-inputs">
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="personal-input">
                    <label htmlFor="phone">Phone No.</label>
                    <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="resume-bottom-btns">
                  <div className="resume-btn" onClick={() => setApply(false)}>Cancel</div>
                  <div className="resume-btn btn-background" onClick={() => {
                    if (job?.screeningQuestions?.length > 0) setStep(2);
                    else handleSubmit();
                  }}>{ job?.screeningQuestions?.length > 0 ? "Next" : "Submit" }</div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="apply-job-application-questions">
              <div className="personal-inputs">
                {job?.screeningQuestions?.map((q, i) => (
                  <div className="personal-input" key={i}>
                    <label>{q.question}</label>
                    <input type="text" value={answers[i]?.answer || ""} onChange={(e) => handleAnswerChange(i, e.target.value)} />
                  </div>
                ))}
                <div className="resume-bottom-btns">
                  <div className="resume-btn" onClick={() => setStep(1)}>Back</div>
                  <div className="resume-btn btn-background" onClick={handleSubmit}>Submit</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplyJob;
