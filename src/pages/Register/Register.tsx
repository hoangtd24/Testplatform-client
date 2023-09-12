import { useMutation } from "@apollo/client";
import { Alert, CircularProgress, Modal, Snackbar } from "@mui/material";
import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import InputItem, { FormValues } from "../../components/inputItem/InputItem";
import { REGISTER_USER } from "../../graphql/mutation/User";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

const Register = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [registerUser, { data, loading }] = useMutation(REGISTER_USER);
  console.log(data);
  if (data && data.register?.success) {
    return (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    );
  }
  const handleRegister: SubmitHandler<FormValues> = async (
    data
  ): Promise<void> => {
    const response = await registerUser({ variables: { registerInput: data } });
    // if (response.data?.register?.code === 201) {
    //   navigate("/login");
    // }
    console.log(response);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("login-form-content")}>
        <form
          className={cx("register-form")}
          onSubmit={handleSubmit(handleRegister)}
        >
          <InputItem
            label="Username"
            inputType="text"
            name="username"
            placeholder="Nhập họ tên"
            register={register}
          />
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
            placeholder="Nhập mật khẩu"
            register={register}
          />
          <InputItem
            label="Birthday"
            inputType="date"
            name="birthday"
            placeholder="Nhập ngày sinh"
            register={register}
          />
          <InputItem
            label="Phone"
            inputType="text"
            name="phone"
            placeholder="Nhập số điện thoại"
            register={register}
          />
          <InputItem
            label="Address"
            inputType="text"
            name="address"
            placeholder="Nhập địa chỉ"
            register={register}
          />
          <button className={cx("form-submit-btn")} type="submit">
            Register
          </button>
        </form>
      </div>
      <Modal
        open={loading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Modal>
    </div>
  );
};
export default Register;
