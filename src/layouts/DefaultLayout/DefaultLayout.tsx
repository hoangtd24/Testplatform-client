import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {
  children: JSX.Element;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
