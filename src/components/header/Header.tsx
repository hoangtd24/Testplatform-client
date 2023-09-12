import { useMutation, useQuery } from "@apollo/client";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { LOGOUT_USER } from "../../graphql/mutation/User";
import { LOAD_USER } from "../../graphql/query/User";
import { Logo, Search } from "../icons/Icon";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  //user context
  const { logoutClient } = useAuth();
  const { data } = useQuery(LOAD_USER);

  //state
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [logout, _] = useMutation(LOGOUT_USER);
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async (): Promise<void> => {
    setShowMenu(false);
    logoutClient();
    await logout({ variables: { userId: 1 } });
    navigate("/login");
  };

  const handleClickUserMenuItem = () => {
    setShowMenu(false);
  };

  return (
    <header className={cx("header")}>
      <Link to="/" className={cx("logo")}>
        <Logo />
      </Link>
      <div className={cx("search-wrapper")}>
        <input type="text" placeholder="Nhập từ khóa tìm kiếm" />
        <div className={cx("search-btn")}>
          <Search />
        </div>
      </div>
      <Tippy
        visible={showMenu}
        interactive
        onClickOutside={() => setShowMenu(false)}
        placement={"bottom-end"}
        render={(attrs) => (
          <div className="box" tabIndex={-1} {...attrs}>
            <div className={cx("user__box")}>
              <Link
                to="/profile"
                className={cx("user__info")}
                onClick={handleClickUserMenuItem}
              >
                <img
                  src="../../../src/assets/images/fallback-avatar.jpg"
                  className={cx("user__info--avatar")}
                  alt="avatar"
                />
                <span className={cx("user__info--name")}>
                  {data?.me?.user?.username}
                </span>
              </Link>
              <ul className={cx("user__menu")}>
                <li onClick={handleClickUserMenuItem}>
                  <Link to="/" className={cx("user__menu--item")}>
                    Các kỳ thi
                  </Link>
                </li>
                <li onClick={handleClickUserMenuItem}>
                  <Link to="/result" className={cx("user__menu--item")}>
                    Kết quả thi
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <span className={cx("user__menu--item")}>Đăng xuất</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      >
        <div className={cx("avatar-wrapper")} onClick={handleShowMenu}>
          <div className={cx("avatar-fallback")}>
            <img src="../../../src/assets/images/fallback-avatar.jpg" alt="" />
          </div>
        </div>
      </Tippy>
    </header>
  );
};

export default Header;
