import React, { useState } from "react";
import Button from "../components/button/Button";
import { apiRequest } from "../helper/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("currentwelyncusermail") || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle individual input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return; // Only allow numbers

    let otpArray = [...otp];
    otpArray[index] = value; // Update the OTP at the current index
    setOtp(otpArray);

    // Focus next field if value is entered
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  // Handle backspace to clear the input and move to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
        let otpArray = [...otp];
        otpArray[index - 1] = ""; // Clear the previous field
        setOtp(otpArray);
      } else {
        let otpArray = [...otp];
        otpArray[index] = ""; // Clear the current field
        setOtp(otpArray);
      }
    }
  };

  // Handle OTP paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").split("");
    if (pastedData.length === otp.length) {
      setOtp(pastedData.slice(0, otp.length));
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const code = parseInt(otp.join(""), 10);

      const res = await apiRequest({
        url: "/auth/verify-on-register-email",
        data: { email: userEmail, code },
        method: "POST",
      });

      if (res?.status === "fail") {
        toast.error(res?.message || "Error");
      } else if (res?.status === "success") {
        toast.success(res?.message || "Success");
        localStorage.removeItem("currentwelyncusermail");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
    <div className="auth-page">
      <div className="register-page">
        <div className="auth-top">
          <div className="auth-top-logo">
            <img src="./assets/images/welink.png" alt="WeLink-logo" />
          </div>
          <b className="auth-top-title">Verify OTP</b>
          <p className="auth-top-quote">
            Submit OTP which we sent to {userEmail}. So that you can update
            password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-form-input-section">
            <p className="input-section-label">Enter OTP</p>
            <div
              className="otp-boxs"
              onPaste={handlePaste} // Add paste event handler
            >
              {otp.map((data, i) => (
                <input
                  type="text"
                  className="otp-box"
                  value={data}
                  maxLength={1}
                  key={i}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)} // Add backspace handling
                />
              ))}
            </div>
          </div>
          <Button text={"Submit"} sending={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
