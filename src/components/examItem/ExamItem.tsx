import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Exam } from "../../types/Exam";
import styles from "./ExamItem.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  exam: Exam;
  initResult: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}
const ExamItem = (props: IProps) => {
  const { exam, initResult } = props;
  const navigate = useNavigate();
  const handleInitResult = async () => {
    await initResult({
      variables: { examId: Number(exam.id), options: [] },
    });
    navigate(`exam/${exam.id}`, { replace: true });
  };
  return (
    <div className={cx("exam_item")}>
      <div className={cx("exam_item-wrapper")}>
        <div className={cx("exam_item-img")}></div>
        <div className={cx("exam_item-content")}>
          <h2 className={cx("exam_item-title")}>{exam.name}</h2>
          <div className={cx("exam_item-list")}>
            <div className={cx("exam_item-name")}>
              <span>Ngày bắt đầu:</span>
              <span>{new Date(exam.timeStart).toLocaleString("en-GB")}</span>
            </div>
            <div className={cx("exam_item-name")}>
              <span>Ngày kết thúc:</span>
              <span>{new Date(exam.timeEnd).toLocaleString("en-GB")}</span>
            </div>
            <div className={cx("exam_item-name")}>
              <span>Thời gian thi:</span>
              <span>{exam.time} phút</span>
            </div>
          </div>
          <button className={cx("john_exam")} onClick={handleInitResult}>
            Vào thi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamItem;
