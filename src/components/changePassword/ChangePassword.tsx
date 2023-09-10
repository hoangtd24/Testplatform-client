import { useMutation } from "@apollo/client";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { CHANGE_PASSWORD } from "../../graphql/mutation/User";
import { PasswordInput } from "../../types/PasswordInput";
import styles from "./ChangePassword.module.scss";

const cx = classNames.bind(styles);

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChangePassword = (props: Props) => {
  const { setOpen } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordInput>();

  const [changePassword, _] = useMutation(CHANGE_PASSWORD);

  const handleChangeUserInfo = async (data: PasswordInput) => {
    //write somthing
    await changePassword({ variables: { PasswordInput: data } });
    setOpen(false);
  };
  return (
    <div className={cx("wrapper")}>
      <h2>Đổi mật khẩu</h2>
      <form
        className={cx("form__wrapper")}
        onSubmit={handleSubmit(handleChangeUserInfo)}
      >
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Mật khẩu hiện tại</span>
            <p>*</p>
          </div>
          <div className={cx("form-item-input")}>
            <input
              className={cx("form-control")}
              type="text"
              {...register("currentPass", {
                required: true,
                //write condition here
              })}
            />
            {errors?.currentPass?.type === "required" && (
              <span className={cx("form-message")}>
                Vui lòng nhập dòng này!
              </span>
            )}
            {errors?.currentPass?.type === "maxLength" && (
              <span className={cx("error-message")}>
                Vui lòng nhập họ tên ít hơn 100 kí tự
              </span>
            )}
            {errors?.currentPass?.type === "format" && (
              <span className={cx("error-message")}>
                Vui lòng nhập lại họ tên
              </span>
            )}
          </div>
        </div>
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Mật khẩu mới</span>
            <p>*</p>
          </div>
          <div className={cx("form-item-input")}>
            <input
              type="text"
              className={cx("form-control")}
              {...register("newPass", {
                required: true,
                // pattern:
                //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //add condition here
              })}
            />
            {errors?.newPass?.type === "required" && (
              <span className={cx("form-message")}>
                Vui lòng nhập dòng này!
              </span>
            )}
            {errors?.newPass?.type === "pattern" && (
              <span className={cx("form-message")}>
                Vui lòng nhập lại dòng này!
              </span>
            )}
          </div>
        </div>
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Mật khẩu mới</span>
            <p>*</p>
          </div>
          <div className={cx("form-item-input")}>
            <input
              type="text"
              className={cx("form-control")}
              {...register("reNewPass", {
                required: true,
                // pattern:
                //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //add condition here
              })}
            />
            {errors?.newPass?.type === "required" && (
              <span className={cx("form-message")}>
                Vui lòng nhập dòng này!
              </span>
            )}
            {errors?.newPass?.type === "pattern" && (
              <span className={cx("form-message")}>
                Vui lòng nhập lại dòng này!
              </span>
            )}
          </div>
        </div>
        <div className={cx("actions")}>
          <input type="button" value="Hủy" onClick={() => setOpen(false)} />
          <input type="submit" value="Lưu" />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
