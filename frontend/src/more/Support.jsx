import React, { useRef, useState } from "react";
import MetaData from "./Metadata";
import "./Support.css";
import emailjs from "@emailjs/browser";
import BottomTab from "./BottomTab.jsx";
import { toast } from "react-toastify";

const Support = () => {
  const [done, setDone] = useState(false);

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_zupyyri","template_f1adlln", formRef.current,"F857EGpJJeaEq6jAB" )
    // emailjs.sendForm("service_zupyyri", "template_f1adlln", e.target ,"F857EGpJJeaEq6jAB" )
      .then(
        (result) => {
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <MetaData title="Support" />
      <div
        className="support"
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0",
        }}
      >
        <h2
          className="support__heading"
          style={{
            textAlign: "center",
          }}
        >
          Hey How can we improve our services
        </h2>
        <h2
          className="support__heading"
          style={{
            textAlign: "center",
          }}
        >
          Report us for something...
        </h2>
        <div>
          <form
            style={{
              width: "400px",
              margin: "auto",
              padding: "20px 0",
            }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Write your Name ..."
              required
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
                height: "40px",
              }}
              name="user_name"
            />
            <input
              type="text"
              placeholder="Write a Subject ..."
              required
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
                height: "40px",
              }}
              name="user_subject"
            />
            <input
              type="email"
              placeholder="write your Email ..."
              required
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
                height: "40px",
              }}
              name="user_email"
            />
            <textarea
              cols="30"
              rows="5"
              required
              placeholder="write your message ..."
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                borderBottom: "1px solid #3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
              }}
              name="user_message"
            ></textarea>
            <button
              style={{
                border: "none",
                cursor: "pointer",
                width: "100%",
                background: "#3BB77E",
                height: "40px",
                margin: "10px 0",
                color: "#fff",
                fontSize: "1.2vmax",
              }}
            >
              Submit
            </button>
            {done &&
              toast.success(
                "Thanks for your report we will reply it in very soon..."
              ) && (setDone(false))}
          </form>
          <div className="animation"></div>
        </div>
      </div>

      <BottomTab />
    </>
  );
};

export default Support;
