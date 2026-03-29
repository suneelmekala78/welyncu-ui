import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePageApi, deletePageApi } from "../../helper/apis";

const CompanyProfileTop = ({ page, onFollow, user, onPageUpdated }) => {
  const navigate = useNavigate();
  const isFollowing = page?.followers?.some(f => (f._id || f) === user?._id);
  const isOwner = page?.creator?._id === user?._id || page?.creator === user?._id;
  const [showMore, setShowMore] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const openEdit = () => {
    setEditData({
      name: page?.name || "",
      headline: page?.headline || "",
      about: page?.about || "",
      industry: page?.industry || "",
      size: page?.size || "",
      type: page?.type || "",
      headquarters: page?.headquarters || "",
      websiteLink: page?.websiteLink || "",
      founded: page?.founded || "",
    });
    setShowEdit(true);
    setShowMore(false);
  };

  const handleEditSave = async () => {
    setIsSaving(true);
    const res = await updatePageApi(page._id, editData);
    setIsSaving(false);
    if (res?.status === "success") {
      toast.success("Page updated");
      setShowEdit(false);
      if (onPageUpdated) onPageUpdated(res.page);
    } else {
      toast.error(res?.message || "Failed to update");
    }
  };

  const handleDelete = async () => {
    const res = await deletePageApi(page._id);
    if (res?.status === "success") {
      toast.success("Page deleted");
      navigate("/");
    } else {
      toast.error(res?.message || "Failed to delete");
    }
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="company-profile-top-section box-shadow">
        <div className="company-top-banner">
          <img
            src={page?.banner || "https://www.wework.com/ideas/wp-content/uploads/sites/4/2017/06/Collab1.jpg"}
            alt="banner-img"
          />
        </div>
        <div className="company-top-details">
          <div className="company-details-left">
            <div className="company-profile-name">
              {page?.name} <i className="fa-regular fa-check-circle"></i>
            </div>
            <div className="company-profile-title">
              {page?.headline}
            </div>
          </div>
          <div className="company-details-right">
            {page?.websiteLink && (
              <div className="company-profile-topbtn company-website-btn" onClick={() => window.open(page.websiteLink, "_blank")}>
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Visit Website
              </div>
            )}
            {!isOwner && (
              <div className="company-profile-topbtn company-follow-btn btn-background" onClick={onFollow}>
                <i className={isFollowing ? "fa fa-check" : "fa fa-plus"}></i> {isFollowing ? "Following" : "Follow"}
              </div>
            )}
            {isOwner && (
              <div className="company-profile-topbtn company-website-btn" onClick={openEdit}>
                <i className="fa fa-pen"></i> Edit
              </div>
            )}
            <div className="company-profile-topbtn company-website-btn more-btn" onClick={() => setShowMore(!showMore)} style={{ position: "relative" }}>
              <i className="fa-solid fa-ellipsis"></i>
              {showMore && (
                <div className="more-container more-container-active box-shadow" style={{ position: "absolute", top: "100%", right: 0, minWidth: 140, zIndex: 20 }}>
                  {isOwner && (
                    <>
                      <div className="more-item cp p-10" onClick={openEdit}>
                        <i className="fa fa-pen"></i> <span>Edit Page</span>
                      </div>
                      <div className="more-item cp p-10" onClick={() => { setShowDeleteConfirm(true); setShowMore(false); }} style={{ color: "#e53935" }}>
                        <i className="fa fa-trash"></i> <span>Delete Page</span>
                      </div>
                    </>
                  )}
                  {!isOwner && (
                    <div className="more-item cp p-10" onClick={onFollow}>
                      <i className={isFollowing ? "fa fa-user-minus" : "fa fa-user-plus"}></i>
                      <span>{isFollowing ? "Unfollow" : "Follow"}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Page Popup */}
      {showEdit && (
        <div className="popup-section popup-section-active">
          <div className="popup-container box-shadow p-15 post-upload-box" style={{ maxWidth: 650 }}>
            <i className="fa fa-xmark" onClick={() => setShowEdit(false)}></i>
            <div className="profile-top-details-edit-section">
              <div className="profile-top-details-edit-top">
                <div className="edit-top-title">Edit Page</div>
              </div>
              <div className="personal-inputs" style={{ padding: "10px 0" }}>
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label>Company Name</label>
                    <input type="text" name="name" value={editData.name} onChange={handleEditChange} />
                  </div>
                  <div className="personal-input">
                    <label>Headline</label>
                    <input type="text" name="headline" value={editData.headline} onChange={handleEditChange} />
                  </div>
                </div>
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label>Industry</label>
                    <input type="text" name="industry" value={editData.industry} onChange={handleEditChange} />
                  </div>
                  <div className="personal-input">
                    <label>Headquarters</label>
                    <input type="text" name="headquarters" value={editData.headquarters} onChange={handleEditChange} />
                  </div>
                </div>
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label>Organization Size</label>
                    <select name="size" value={editData.size} onChange={handleEditChange}>
                      <option value="0 - 1">0 - 1 employees</option>
                      <option value="2 - 10">2 - 10 employees</option>
                      <option value="11 - 50">11 - 50 employees</option>
                      <option value="51 - 200">51 - 200 employees</option>
                      <option value="201 - 500">201 - 500 employees</option>
                      <option value="501 - 1,000">501 - 1,000 employees</option>
                      <option value="1,001 - 5,000">1,001 - 5,000 employees</option>
                      <option value="5,001 - 10,000">5,001 - 10,000 employees</option>
                      <option value="10,000+">10,000+ employees</option>
                    </select>
                  </div>
                  <div className="personal-input">
                    <label>Organization Type</label>
                    <select name="type" value={editData.type} onChange={handleEditChange}>
                      <option value="Public Company">Public Company</option>
                      <option value="Private Company">Private Company</option>
                      <option value="Non Profit Company">Non Profit Company</option>
                      <option value="Self Employed">Self Employed</option>
                      <option value="Government Agency">Government Agency</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>
                </div>
                <div className="personal-flex-inputs">
                  <div className="personal-input">
                    <label>Website</label>
                    <input type="text" name="websiteLink" value={editData.websiteLink} onChange={handleEditChange} />
                  </div>
                  <div className="personal-input">
                    <label>Founded</label>
                    <input type="text" name="founded" value={editData.founded} onChange={handleEditChange} placeholder="e.g. 2020" />
                  </div>
                </div>
                <div className="personal-input" style={{ marginTop: 8 }}>
                  <label>About</label>
                  <textarea name="about" value={editData.about} onChange={handleEditChange} rows={4} style={{ width: "100%", padding: 10, borderRadius: 5, border: "1px solid rgba(128,128,128,0.3)", outline: "none", resize: "vertical", fontSize: 13, boxSizing: "border-box" }} />
                </div>
              </div>
            </div>
            <div className="profile-top-details-edit-bottom">
              <div className="profile-top-details-edit-bottom-left"></div>
              <div className="profile-top-details-edit-bottom-right">
                <span className="save-btn btn-background" onClick={handleEditSave}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="popup-section popup-section-active">
          <div className="popup-container box-shadow p-15" style={{ maxWidth: 420, textAlign: "center" }}>
            <i className="fa fa-xmark" onClick={() => setShowDeleteConfirm(false)}></i>
            <div style={{ padding: "20px 10px" }}>
              <i className="fa fa-exclamation-triangle" style={{ fontSize: 40, color: "#e53935", marginBottom: 15 }}></i>
              <h3 style={{ margin: "0 0 8px" }}>Delete this page?</h3>
              <p style={{ color: "#888", fontSize: 13, margin: "0 0 20px" }}>
                This action cannot be undone. All page data, followers, and content will be permanently removed.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: "8px 24px", borderRadius: 5, border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: 14 }}>
                  Cancel
                </button>
                <button onClick={handleDelete} style={{ padding: "8px 24px", borderRadius: 5, border: "none", background: "#e53935", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                  Delete Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfileTop;
