import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";

const cx = classNames.bind(styles);

const ForgotPassword = () => {
  //type

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
