import classNames from "classnames/bind";
import { UseFormRegister } from "react-hook-form";
import styles from "./InputItem.module.scss";

const cx = classNames.bind(styles);

export type FormValues = {
  [key: string]: any;
};

interface InputProps {
  label?: string;
  inputType: React.HTMLInputTypeAttribute | undefined;
  name: string;
  placeholder?: string;
  register: UseFormRegister<FormValues>;
}
const InputItem = (props: InputProps) => {
  const { label, inputType, name, placeholder, register } = props;
  return (
    <div className={cx("form-group")}>
      <label htmlFor="email">{label}</label>
      <input {...register(name)} type={inputType} placeholder={placeholder} />
    </div>
  );
};

export default InputItem;
