import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loading from "../../more/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../reduxSlices/userSlice";
import { toast } from 'react-toastify';
import MetaData from "../../more/Metadata";

const  ForgotPassword = () => {
    const dispatch = useDispatch();
  
    const { error, message, loading } = useSelector((state) => state.user);
  
    const [email, setEmail] = useState("");
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      
      dispatch(forgotPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        toast.success(message);
      }
    }, [dispatch, error, message]);
  
    return (
      <Fragment>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <MetaData title="Forgot Password" />
            <div className="forgotPasswordContainer">
              <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Password</h2>
  
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <div className="forgotPasswordEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                  <input
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };

export default ForgotPassword