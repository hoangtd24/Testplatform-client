import { useMutation } from "@apollo/client";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputItem, { FormValues } from "../../components/inputItem/InputItem";
import { useAuth } from "../../context/UserContext";
import { LOGIN_USER } from "../../graphql/mutation/User";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

const Login = () => {
  //type
  const { setIsAuthenticated } = useAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [login, { data }] = useMutation(LOGIN_USER);
  console.log(data);

  const handleLogin: SubmitHandler<FormValues> = async (
    data
  ): Promise<void> => {
    const response = await login({ variables: { loginInput: data } });
    if (response.data?.login.success) {
      localStorage.setItem("token", response.data?.login.accessToken);
      setIsAuthenticated(true);
      navigate(from, { replace: true });
    } else {
      response.data.login.errors.map((err: any) => {
        setError(err.field, {
          type: err.field,
          message: err.message,
        });
      });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("login-form-content")}>
        <div className={cx("form-container")}>
          <div className={cx("logo-container")}>Login</div>
          <form className={cx("form")} onSubmit={handleSubmit(handleLogin)}>
            <InputItem
              label="Email"
              inputType="email"
              name="email"
              placeholder="Nhập Email"
              register={register}
            />
            <InputItem
              label="Password"
              inputType="password"
              name="password"
              placeholder="Nhập password"
              register={register}
            />
            {errors.email?.type === "email" && (
              <span className={cx("error-message")}>
                {errors.email?.message as string}
              </span>
            )}
            {errors.password?.type === "password" && (
              <span className={cx("error-message")}>
                {errors.password?.message as string}
              </span>
            )}
            <Link to="/forget-password" className={cx("forget-link")}>
              {" "}
              Forget password ?
            </Link>
            <button className={cx("form-submit-btn")} type="submit">
              Login
            </button>
          </form>

          <p className={cx("signup-link")}>
            Don't have an account?
            <Link to="/register"> Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
