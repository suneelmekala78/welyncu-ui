import React, { useState } from "react";
import Button from "../components/button/Button";
import { toast } from "react-toastify";
import { apiRequest } from "../helper/apis";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const res = await apiRequest({
        url: "/auth/forgot-password",
        data: { email },
        method: "POST",
      });

      if (res?.status === "fail") {
        toast.error(res?.message || "Error");
      } else if (res?.status === "success") {
        toast.success(res?.message || "Success");
        setIsSent(true);
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
            <b className="auth-top-title">Forgot Password</b>
            {!isSent && (
              <p className="auth-top-quote">
                Don't worry! We will send OTP to your registered mail. So that
                you can change password.
              </p>
            )}
          </div>

          {!isSent ? (
            <form onSubmit={onSubmit} className="auth-form">
              <div className="auth-form-input-section">
                <p className="input-section-label">Email </p>
                <div className="input-box">
                  <i className="fa-regular fa-envelope"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button text={"Send"} sending={isSubmitting} />
            </form>
          ) : (
            <div className="forgot-pass-mail-success">
              <div className="i-tick">
                <i className="fa fa-check"></i>
              </div>
              <span>Password reset link has been sent to your mail.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
