import React from "react";
import "../components/post-job/postJob.css";
import TopNav from "../components/topnav/TopNav";
import JobPostQuestions from "../components/post-job/JobPostQuestions";
import PremiumCard from "../components/home/PremiumCard";

const PostJob = () => {
  return (
    <>
      <TopNav />
      <div className="post-job-page">
        <div className="post-job-left mt-10">
          <div className="post-job-box">
            <JobPostQuestions />
          </div>
        </div>
        <div className="post-job-right">
          <PremiumCard />
        </div>
      </div>
    </>
  );
};

export default PostJob;
