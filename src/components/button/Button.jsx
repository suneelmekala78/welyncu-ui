import React from "react";
import "./button.css";

const Button = ({ text, sending }) => {
  return (
    <>
      {!sending ? (
        <button className="button-section">{text}</button>
      ) : (
        <button className="button-sending">Sending...</button>
      )}
    </>
  );
};

export default Button;
