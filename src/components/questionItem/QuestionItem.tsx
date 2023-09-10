import classNames from "classnames/bind";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Flag } from "../icons/Icon";
import styles from "./QuestionItem.module.scss";
import { Question } from "../../types/Question";
import { UserOption } from "../../pages/Result/Result";

const cx = classNames.bind(styles);

export interface Props {
  register: UseFormRegister<FieldValues>;
  question: Question;
  number: number;
  disabled?: boolean;
  userOption?: UserOption;
}

const QuestionItem = (props: Props) => {
  const { register, question, number, disabled, userOption } = props;
  return (
    <div className={cx("question-item")}>
      <div className={cx("question-item_left")}>
        <p className={cx("question-item_name")}>{`Câu ${number + 1}`}</p>
        <p>Số điểm tối đa: 1</p>
        <div className={cx("question-item_flag")}>
          <Flag />
          <span>Làm sau</span>
        </div>
      </div>
      <div className={cx("question-item_right")}>
        <div className={cx("question-item-label")}>
          <span>{question.quiz}</span>
        </div>
        <div className={cx("question-item-list-option")}>
          {question.options.map((option, index) => (
            <div className={cx("question-item-option-item")} key={index}>
              <input
                {...register(`${question.id}`)}
                type={question.type}
                className={cx("pointer")}
                disabled={disabled}
                value={option}
                id={option}
                checked={userOption?.options.includes(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
