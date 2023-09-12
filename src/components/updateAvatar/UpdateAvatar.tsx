import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../../utils/canvasPreview";
import styles from "./UpdateAvatar.module.scss";

const cx = classNames.bind(styles);

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imgSrc: string;
  handlePreviewImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function UpdateProfile(props: Props) {
  const { setOpen, imgSrc, handlePreviewImage } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [crop, setCrop] = useState<Crop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobUrlRef = useRef(""); // get blob to send to server

  console.log(setRotate, setAspect);
  useEffect(() => {
    const handleCanvas = async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    };
    handleCanvas();
  }, [completedCrop, scale, rotate]);
  const zoomOut = () => {
    sliderRef.current?.stepUp();
    setScale(Number(sliderRef.current?.value));
  };

  const zoomIn = () => {
    sliderRef.current?.stepDown();
    setScale(Number(sliderRef.current?.value));
  };

  const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      console.log(blobUrlRef.current);
    });
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("popup_header")}>
        <span>Cập nhập ảnh đại diện</span>
        <div className={cx("circle-icon")} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
      </div>
      <div className={cx("popup_content")}>
        <div className={cx("cropper")}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
        <div className={cx("slider")}>
          <div className={cx("slider-circle")} onClick={() => zoomIn()}>
            <RemoveRoundedIcon />
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="0.02"
            value={scale}
            ref={sliderRef}
            onChange={(e) => setScale(Number(e.target.value))}
          />
          <div className={cx("slider-circle")} onClick={() => zoomOut()}>
            <AddIcon />
          </div>
        </div>
      </div>
      <>
        <div className={cx("actions")}>
          <div
            className={cx("upload-btn")}
            onClick={() => inputRef.current?.click()}
          >
            <i className={cx("plus_icon")}></i>
            <span>Tải ảnh lên</span>
          </div>
          <div className={cx("frame_btn")}>
            <i className={cx("frame_icon")}></i>
            <span>Thêm khung</span>
          </div>
          <input
            type="file"
            hidden
            onChange={handlePreviewImage}
            ref={inputRef}
          />
        </div>
      </>
      <div className={cx("popup_footer")}>
        <div className={cx("popup_footer-actions")}>
          <Button className={cx("cancel_btn")} onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={onDownloadCropClick} variant="contained">
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
