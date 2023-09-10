import { useMutation } from "@apollo/client";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { UPDATE_PROFILE } from "../../graphql/mutation/User";
import { GET_PROFILE } from "../../graphql/query/User";
import { User } from "../../types/User";
import styles from "./EditUser.module.scss";

const cx = classNames.bind(styles);

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}
const EditUser = (props: Props) => {
  const { setOpen, user } = props;

  //init react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      ...user,
      birthday: dayjs(user.birthday).format("YYYY-MM-DD"),
    },
  });

  //call method from graphql
  const [updateProfile, _] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [GET_PROFILE],
  });

  //handle change user info
  const handleChangeUserInfo = async (data: User) => {
    await updateProfile({ variables: { ProfileInput: data } });
    setOpen(false);
  };

  return (
    <div className={cx("wrapper")}>
      <h2>Chỉnh sửa thông tin</h2>
      <form
        className={cx("form__wrapper")}
        onSubmit={handleSubmit(handleChangeUserInfo)}
      >
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Họ tên</span>
            <p>*</p>
          </div>
          <div className={cx("form-item-input")}>
            <input
              className={cx("form-control")}
              type="text"
              {...register("username", {
                required: true,
                maxLength: 100,
                validate: {
                  format: (value) =>
                    !/[0-9`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]+$/.test(
                      value
                    ),
                },
              })}
              placeholder="Nhập họ tên"
            />
            {errors?.username?.type === "required" && (
              <span className={cx("form-message")}>
                Vui lòng nhập dòng này!
              </span>
            )}
            {errors?.username?.type === "maxLength" && (
              <span className={cx("error-message")}>
                Vui lòng nhập họ tên ít hơn 100 kí tự
              </span>
            )}
            {errors?.username?.type === "format" && (
              <span className={cx("error-message")}>
                Vui lòng nhập lại họ tên
              </span>
            )}
          </div>
        </div>
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Email</span>
            <p>*</p>
          </div>
          <div className={cx("form-item-input")}>
            <input
              type="text"
              placeholder="Nhập email"
              className={cx("form-control")}
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors?.email?.type === "required" && (
              <span className={cx("form-message")}>
                Vui lòng nhập dòng này!
              </span>
            )}
            {errors?.email?.type === "pattern" && (
              <span className={cx("form-message")}>
                Vui lòng nhập lại dòng này!
              </span>
            )}
          </div>
        </div>
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Ngày sinh</span>
          </div>
          <div className={cx("form-item-input")}>
            <input
              type="date"
              className={cx("form-control")}
              {...register("birthday")}
              placeholder="Nhập ngày sinh"
            />
            {errors?.birthday?.type === "pattern" && (
              <span className={cx("form-message")}>
                Vui lòng nhập lại ngày sinh
              </span>
            )}
          </div>
        </div>
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Số điện thoại</span>
          </div>
          <div className={cx("form-item-input")}>
            <input
              type="text"
              className={cx("form-control")}
              {...register("phone", {
                minLength: 10,
                maxLength: 12,
                pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
              })}
              placeholder="Nhập số điện thoại"
            />
            {errors?.phone?.type === "pattern" && (
              <span className={cx("form-message")}>
                Vui lòng nhập lại số điện thoại.
              </span>
            )}
            {errors?.phone?.type === "minLength" && (
              <span className={cx("form-message")}>
                Vui lòng nhập lại số điện thoại.
              </span>
            )}
            {errors?.phone?.type === "maxLength" && (
              <span className={cx("form-message")}>
                Vui lòng nhập lại số điện thoại.
              </span>
            )}
          </div>
        </div>
        <div className={cx("form-item")}>
          <div className={cx("form-item-label")}>
            <span>Địa chỉ</span>
          </div>
          <div className={cx("form-item-input")}>
            <input
              type="text"
              className={cx("form-control")}
              {...register("address")}
              placeholder="Nhập địa chỉ"
            />
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

export default EditUser;
