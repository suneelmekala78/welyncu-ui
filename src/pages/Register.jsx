import React, { useState } from "react";
import { toast } from "react-toastify";
import "../components/register/register.css";
import Button from "../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../helper/apis";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    number: "",
    email: "",
    password: "",
  });

  // onChange handler for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           const { city, countryName } = data;
  //           // Now you have the city and country
  //           console.log("City:", city);
  //           console.log("Country:", countryName);
  //           // You can save this to your user model
  //         })
  //         .catch((error) => console.error("Error fetching location:", error));
  //     }, (error) => {
  //       console.error("Geolocation error:", error);
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });

      if (res?.status === "fail") {
        toast.error(res?.message || "Error");
      } else if (res?.status === "success") {
        toast.success(res?.message || "Success");
        localStorage.setItem("currentwelyncusermail", data.email);
        setTimeout(() => { 
          navigate("/verifyotp");
        }, 2000);
        setData({
          fullName: "",
          number: "",
          email: "",
          password: "",
        });
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
                alt="WeLyncu-logo"
              />
            </div>
            <b className="auth-top-title">Welcome To WeLyncu</b>
            <p className="auth-top-quote">
              Make the most of your professional life
            </p>
          </div>

          <form onSubmit={onSubmit} className="auth-form">
            <div className="auth-form-input-section">
              <p className="input-section-label">Full name</p>
              <div className="input-box">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="auth-form-input-section">
              <p className="input-section-label">Email</p>
              <div className="input-box">
                <i className="fa-regular fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="auth-form-input-section">
              <p className="input-section-label">Mobile </p>
              <div className="input-box">
                <i className="fa fa-phone"></i>
                <input
                  type="text"
                  name="number"
                  value={data.number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="auth-form-input-section">
              <p className="input-section-label">
                Password (More than 6 charecters)
              </p>
              <div className="input-box">
                <i
                  className={seePassword ? "fa fa-eye" : "fa fa-eye-slash"}
                  onClick={() => setSeePassword(!seePassword)}
                ></i>
                <input
                  type={seePassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <p className="auth-polacy-txt">
              You agree to the WeLink <span>User Agreement</span>,{" "}
              <span>Privacy Policy</span>, and <span>Cookie Policy</span>.
            </p>

            <Button text={"Agree & Join"} sending={isSubmitting} />
          </form>

          <div className="auth-bottom">
            {/* <p className="auth-polacy-txt">Or login with</p>
            <div className="auth-sm-links">
              <div className="auth-sm-link-box">
                <i className="fa fa-google"></i>
                <p>Google</p>
              </div>
              <div className="auth-sm-link-box">
                <i className="fa fa-facebook"></i>
                <p>Facebook</p>
              </div>
            </div> */}
            <div className="hr"></div>
            <div className="auth-redirects">
              <div className="foegot-pass"></div>
              <div className="goto-login">
                Already on WeLink?{" "}
                <Link to="/login">
                  <span>Log in</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
