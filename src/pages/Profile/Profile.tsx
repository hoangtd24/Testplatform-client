import { useQuery } from "@apollo/client";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import ChangePassword from "../../components/changePassword/ChangePassword";
import EditUser from "../../components/editUser/EditUser";
import { Edit } from "../../components/icons/Icon";
import UpdateAvatar from "../../components/updateAvatar/UpdateAvatar";
import { GET_PROFILE } from "../../graphql/query/User";
import { User } from "../../types/User";
import styles from "./Profile.module.scss";
const cx = classNames.bind(styles);

const Profile = () => {
  type event = "editUser" | "changePassword" | "editAvatar";

  const inputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState("");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [type, setType] = useState<event>("editUser");

  const { data, loading } = useQuery(GET_PROFILE);
  console.log(loading);

  const handleClose = (): void => {
    setOpenModal(false);
  };

  const handleClickEditUser = (): void => {
    setOpenModal(true);
    setType("editUser");
  };

  const handleClickChangePassword = (): void => {
    setOpenModal(true);
    setType("changePassword");
  };

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const reader = new FileReader();
    if (files?.length) {
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        setImgSrc(String(event.target?.result));
      };
    }
    setType("editAvatar");
    setOpenModal(true);
  };

  const user: User = data?.getProfile;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("avatar_wrapper")}>
          <img
            src="../../../src/assets/images/fallback-avatar.jpg"
            alt="user_avatar"
          />
          <span
            className={cx("icon")}
            onClick={() => inputRef.current?.click()}
          >
            <CameraAltOutlinedIcon color="inherit" fontSize="small" />
          </span>
          <input
            type="file"
            hidden
            ref={inputRef}
            onChange={handlePreviewImage}
          />
        </div>
        <span className={cx("edit_icon")} onClick={handleClickEditUser}>
          <Edit />
        </span>
        <div className={cx("user__info")}>
          <div className={cx("user__info-item")}>
            <span>Họ tên:</span>
            <span>{user?.username}</span>
          </div>
          <div className={cx("user__info-item")}>
            <span>Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className={cx("user__info-item")}>
            <span>Mật khẩu:</span>
            <span className={cx("btn")} onClick={handleClickChangePassword}>
              Đổi mật khẩu
            </span>
          </div>
          <div className={cx("user__info-item")}>
            <span>Ngày sinh:</span>
            <span>{dayjs(user?.birthday).format("YYYY-MM-DD")}</span>
          </div>
          <div className={cx("user__info-item")}>
            <span>Số điện thoại:</span>
            <span>{user?.phone}</span>
          </div>
          <div className={cx("user__info-item")}>
            <span>Địa chỉ:</span>
            <span>{user?.address}</span>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={cx("modal_container")}>
          {type === "editAvatar" && (
            <UpdateAvatar
              setOpen={setOpenModal}
              imgSrc={imgSrc}
              handlePreviewImage={handlePreviewImage}
            />
          )}
          {type === "editUser" && (
            <EditUser setOpen={setOpenModal} user={user} />
          )}
          {type === "changePassword" && (
            <ChangePassword setOpen={setOpenModal} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
