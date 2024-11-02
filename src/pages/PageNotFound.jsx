import React from "react";
import TopNav from "../components/topnav/TopNav";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <TopNav />
      <div className="page-not-found-page">
        <div className="pnf-main">
          <div className="pnf-left">
            <span className="pnf-title">Page Not Found</span>
            <span className="pnf-text">Oops! Looks like you followed a bad link.</span>
            <Link to="/" className="back-btn btn-background"><i className="fa fa-arrow-left"></i> Go Back</Link>
          </div>
          <img src="https://res.cloudinary.com/demmiusik/image/upload/v1727173507/ezgif-4-3ee8e86889_xrwgbw.gif" alt="404" />
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
