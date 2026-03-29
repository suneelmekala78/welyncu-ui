import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import '../components/company/company.css'
import TopNav from "../components/topnav/TopNav";
import CompanyProfileTop from "../components/company/CompanyProfileTop";
import CompanyMain from "../components/company/CompanyMain";
import { getPageApi, followPageApi } from "../helper/apis";

const CompanyProfile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const res = await getPageApi(id);
      setPage(res?.page || null);
    };
    if (id) fetchPage();
  }, [id]);

  const handleFollow = async () => {
    const res = await followPageApi(id);
    if (res?.status === "success") {
      setPage((prev) => {
        const isFollowing = prev.followers?.some(f => (f._id || f) === user?._id);
        return {
          ...prev,
          followers: isFollowing
            ? prev.followers.filter(f => (f._id || f) !== user?._id)
            : [...(prev.followers || []), user?._id],
        };
      });
    }
  };

  const handlePageUpdated = (updatedPage) => {
    setPage((prev) => ({ ...prev, ...updatedPage }));
  };

  if (!page) return <><TopNav /><div style={{padding: "40px", textAlign: "center"}}>Loading...</div></>;

  return (
    <>
      <TopNav />
      <div className="company-profile-page">
        <div className="company-profile-top">
            <CompanyProfileTop page={page} onFollow={handleFollow} user={user} onPageUpdated={handlePageUpdated} />
        </div>
        <div className="company-profile-main">
            <CompanyMain page={page} />
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
