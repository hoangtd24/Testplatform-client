import { Box, Button, Modal } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./ModalCustom.module.scss";

const cx = classNames.bind(styles);

interface Props {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: () => void;
  cancelAction: () => void;
}
const ModalCustom = (props: Props) => {
  const { open, setOpen, title, action, cancelAction } = props;
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={cx("box")}>
        <Box>
          <h1 className={cx("title")}>{title}</h1>
          <div className={cx("actions")}>
            <Button
              variant="text"
              style={{ fontSize: "13px", backgroundColor: "#FC9B00" }}
              onClick={() => {
                setOpen(false);
                cancelAction();
              }}
              size="large"
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              style={{ fontSize: "13px" }}
              onClick={() => {
                action();
                setOpen(false);
              }}
              size="large"
            >
              OK
            </Button>
          </div>
        </Box>
      </div>
    </Modal>
  );
};

export default ModalCustom;
