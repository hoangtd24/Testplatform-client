import { useMutation } from "@apollo/client";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, User } from "../../components/icons/Icon";
import { useAuth } from "../../context/UserContext";
import { FORGET_PASSWORD, LOGIN_USER } from "../../graphql/mutation/User";
import styles from "./ForgotPassword.module.scss";

const cx = classNames.bind(styles);

const ForgotPassword = () => {
  //type

  type FormValues = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [forgetPassword, _] = useMutation(FORGET_PASSWORD);

  const handleLogin: SubmitHandler<FormValues> = async ({
    email,
  }): Promise<void> => {
    const response = await forgetPassword({ variables: { email: email } });
    console.log(response);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("login-form-content")}>
        <div className={cx("form-container")}>
          <div className={cx("logo-container")}>Forgot Password</div>

          <form className={cx("form")}>
            <div className={cx("form-group")}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            <button className={cx("form-submit-btn")} type="submit">
              Send Email
            </button>
          </form>

          <p className={cx("signup-link")}>
            Don't have an account?
            <a href="#" className={cx("signup-link link")}>
              {" "}
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
