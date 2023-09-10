import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Facebook, Linkin, Youtube } from "../icons/Icon";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer_wrapper")}>
      <section className={cx("footer_top")}>
        <section className={cx("footer_left")}>
          <h2 className={cx("footer_left-heading")}>
            CÔNG TY CỔ PHẦN AN NINH MẠNG VIỆT NAM
          </h2>
          <ul className={cx("footer_left-list")}>
            <li className={cx("footer_left-item")}>
              Trụ sở: 275 Nguyễn Trãi, phường Thanh Xuân Trung, quận Thanh Xuân,
              Hà Nội
            </li>
            <li className={cx("footer_left-item")}>
              Chi nhánh: Tầng 3, An Phú Plaza, 117-119 Lý Chính Thắng, phường Võ
              Thị Sáu, quận 3, TP Hồ Chí Minh
            </li>
          </ul>
        </section>
        <section className={cx("footer_right")}>
          <div className={cx("footer_contact-list")}>
            <div className={cx("footer_contact-item")}>
              <span className={cx("footer_contact-icon")}>
                <EmailIcon color={"inherit"} fontSize={"small"} />
              </span>
              <span className={cx("footer_contact-name")}>
                contact@vsec.com.vn
              </span>
            </div>
            <div className={cx("footer_contact-item")}>
              <span className={cx("footer_contact-icon")}>
                <LocalPhoneIcon color={"inherit"} fontSize={"small"} />
              </span>
              <span className={cx("footer_contact-name")}>1800 2056</span>
            </div>
          </div>
          <div className={cx("footer_via-list")}>
            <Link
              to="https://www.facebook.com/vsec.com.vn"
              className={cx("footer_via-item")}
            >
              <Facebook />
            </Link>
            <Link
              to="https://www.linkedin.com/company/vsec-jsc"
              className={cx("footer_via-item")}
            >
              <Linkin />
            </Link>
            <Link
              to="https://www.youtube.com/channel/UCkMSdX_cMNjEtryOql4vVag"
              className={cx("footer_via-item")}
            >
              <Youtube />
            </Link>
          </div>
        </section>
      </section>
      <section className={cx("footer-bottom")}>
        <div className={cx("copyright")}>Copyright @2021 VSEC</div>
      </section>
    </footer>
  );
};

export default Footer;
