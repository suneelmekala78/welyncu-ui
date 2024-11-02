import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../components/login/login.css";
import Button from "../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../helper/apis";
import { toast } from "react-toastify";
import { login } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });

      console.log(res);

      if (res?.status === "fail") {
        toast.error(res?.message || "Error");
      } else if (res?.status === "success") {
        toast.success(res?.message || "Success");
        const newData = {
          user: res?.user,
        };
        dispatch(login(newData));

        setTimeout(() => {
          navigate("/");
        }, 1000);
        setData({
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
              <img src="./assets/images/welink.png" alt="WeLink-logo" />
            </div>
            <b className="auth-top-title">Welcome Back</b>
            <p className="auth-top-quote">
              Don't miss your next opportunity. Sign in to stay updated on your
              professional world.
            </p>
          </div>

          <form onSubmit={onSubmit} className="auth-form">
            <div className="auth-form-input-section">
              <p className="input-section-label">Email </p>
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
              <p className="input-section-label">Password</p>
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

            <p className="auth-rmember-pass">
              <input type="checkbox" name="" id="" /> Remember password
            </p>

            <Button text={"Sign In"} sending={isSubmitting} />
          </form>

          <div className="auth-bottom">
            <div className="hr"></div>
            <div className="auth-redirects">
              <div className="foegot-pass">
                <Link to="/forgotpassword">
                  <span>Forgot password?</span>
                </Link>
              </div>
              <div className="goto-login">
                New to WeLink?{" "}
                <Link to="/register">
                  <span>Join now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
