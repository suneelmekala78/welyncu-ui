import React, { useState } from "react";
import Button from "../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../helper/apis";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [cnewPassword, setCNewPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await apiRequest({
        url: "/auth/reset-password",
        data: { token, newPassword, cnewPassword },
        method: "POST",
      });

      if (res?.status === "fail") {
        toast.error(res?.message || "Error");
      } else if (res?.status === "success") {
        toast.success(res?.message || "Success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.info(res?.message || "Info");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="register-page">
          <div className="auth-top">
            <div className="auth-top-logo">
              <img
                src="https://res.cloudinary.com/demmiusik/image/upload/v1727173412/2_luqlxw.png"
                alt="WeLink-logo"
              />
            </div>
            <b className="auth-top-title">Change Password</b>
            <p className="auth-top-quote">
              Enter your new password which includes atleast 6 charecters,
              numbers and symbols
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-input-section">
              <p className="input-section-label">New Password</p>
              <div className="input-box">
                <input
                  type={seePassword ? "text" : "password"}
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <i
                  className={seePassword ? "fa fa-eye" : "fa fa-eye-slash"}
                  onClick={() => setSeePassword(!seePassword)}
                ></i>
              </div>
            </div>
            <div className="auth-form-input-section">
              <p className="input-section-label">Enter New Password</p>
              <div className="input-box">
                <input
                  type={seePassword ? "text" : "password"}
                  name="cpassword"
                  value={cnewPassword}
                  onChange={(e) => setCNewPassword(e.target.value)}
                />
                <i
                  className={seePassword ? "fa fa-eye" : "fa fa-eye-slash"}
                  onClick={() => setSeePassword(!seePassword)}
                ></i>
              </div>
            </div>
            <Button text={"Submit"} sending={isSubmitting} />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
