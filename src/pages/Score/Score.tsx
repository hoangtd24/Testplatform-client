import { useQuery } from "@apollo/client";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import styles from "./Score.module.scss";
import { GET_ONE_RESULT } from "../../graphql/query/Result";

const cx = classNames.bind(styles);
function Score() {
  const { id } = useParams();
  const { data } = useQuery(GET_ONE_RESULT, {
    variables: { resultId: Number(id) },
  });

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("header")}>CÔNG TY CỔ PHẦN AN NINH MẠNG VIỆT NAM</h1>
      <img
        src="../../../src/assets/images/VSEC_logo_2.png"
        alt="logo_vsec"
        className={cx("logo")}
      />
      <img
        src="../../../src/assets/images/frame.png"
        alt="frame_image"
        className={cx("frame")}
      />
      <div className={cx("score_result")}>
        <span>Chúc mừng bạn đã hoàn thành phần thi !</span>
        <span>
          {`Số điểm của bạn là: ${data?.getOneResult?.result?.score} điểm`}
        </span>
      </div>
      <Link to="/">
        <button className={cx("back_btn")}>
          <p className={cx("btn_title")}>Trang chủ</p>
          <div className={cx("icon")}>
            <ArrowRightAltRoundedIcon />
          </div>
        </button>
      </Link>
    </div>
  );
}
export default Score;
