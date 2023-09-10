import { useMutation } from "@apollo/client";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, User } from "../../components/icons/Icon";
import { useAuth } from "../../context/UserContext";
import { LOGIN_USER } from "../../graphql/mutation/User";
import styles from "./ResetPassword.module.scss";

const cx = classNames.bind(styles);

const ResetPassword = () => {
  //type
  const { setIsAuthenticated } = useAuth();

  const [searchParams] = useSearchParams();
  console.log(searchParams.get('userId'));
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  type FormValues = {
    email: string;
    password: string;
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [login, _] = useMutation(LOGIN_USER);

  const handleLogin: SubmitHandler<FormValues> = async (
    data
  ): Promise<void> => {
    const response = await login({ variables: { loginInput: data } });
    if (response.data?.login.success) {
      localStorage.setItem("token", response.data?.login.accessToken);
      setIsAuthenticated(true);
      navigate(from, { replace: true });
    } else {
      setError("password", {
        type: "checkPassword",
        message: response.data?.login.message,
      });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <img
        src="../../../src/assets/images/Login.png"
        alt="Login Image"
        className={cx("login-image")}
      />
      <div className={cx("login-form-content")}>
        <img
          src="../../../src/assets/images/LoginHeader.png"
          className={cx("header-img")}
        />
        <form className={cx("login-form")} onSubmit={handleSubmit(handleLogin)}>
          <div className={cx("form-item")}>
            <input
              className={cx("form-control")}
              type="text"
              placeholder="Nhập Email"
              {...register("email", {
                required: true,
                pattern: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
            <div className={cx("placeholder")}>
              <p>Nhập Email </p>
              <span>*</span>
            </div>
            <div className={cx("icon")}>
              <User />
            </div>
          </div>
          {errors?.email?.type === "required" && (
            <span className={cx("form-message")}>Vui lòng nhập email!</span>
          )}
          {errors?.email?.type === "pattern" && (
            <span className={cx("form-message")}>Vui lòng nhập lại email!</span>
          )}
          <div className={cx("form-item")}>
            <input
              type={showPassword ? "text" : "password"}
              className={cx("form-control")}
              {...register("password", { required: true })}
              placeholder="Nhập mật khẩu"
            />
            <div className={cx("placeholder")}>
              <p>Nhập mật khẩu</p>
              <span>*</span>
            </div>
            <div
              className={cx("icon", "pointer")}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon
                  sx={{ width: "21px", height: "21px", color: "inherit" }}
                />
              ) : (
                <Eye />
              )}
            </div>
          </div>
          {errors?.password?.type === "required" && (
            <span className={cx("form-message")}>Vui lòng nhập mật khẩu!</span>
          )}
          {errors?.password?.type === "checkPassword" && (
            <span className={cx("form-message")}>
              {errors.password.message}
            </span>
          )}
          <div className={cx("forgot-memory")}>
            <div className={cx("password-memory")}>
              <input type="checkbox" />
              <span>Nhớ mật khẩu</span>
            </div>
            <div className={cx("forgot-password")}>
              <Link to="/forget-password">Quên mật khẩu</Link>
            </div>
          </div>
          <Button
            sx={{ width: "100%", fontSize: "16px", marginTop: "16px" }}
            variant="contained"
            size="large"
            // onClick={handleSubmit(handleSubmitForm)}
            type="submit"
          >
            Đăng nhập
          </Button>
          <Button
            sx={{ width: "100%", fontSize: "16px", marginTop: "16px" }}
            variant="outlined"
            size="large"
          >
            <Link to="/register" style={{ width: "100%" }}>
              Đăng ký
            </Link>
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
