import { useQuery } from "@apollo/client";
import classNames from "classnames/bind";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ModalCustom from "../../components/modalCustom/ModalCustom";
import QuestionItem from "../../components/questionItem/QuestionItem";
import { GET_ONE_RESULT } from "../../graphql/query/Result";
import { Question } from "../../types/Question";
import styles from "./Result.module.scss";
export interface UserOption {
  id: string;
  options: string[];
}
const cx = classNames.bind(styles);

function Exam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register } = useForm();

  const { data } = useQuery(GET_ONE_RESULT, {
    variables: { resultId: Number(id) },
  });
  console.log(data);

  const handleSubmitExam = () => {
    // logic submit

    //navigate to score
    navigate("/score");
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("section")}>
        <h1 className={cx("header")}>Bài đánh giá Thông tin dịch vụ VSEC</h1>
        <div className={cx("exam_time")}>
          <div className={cx("exam_time-icon")}>Kết thúc</div>
          {data && (
            <span
              className={cx("exam_time-left")}
            >{`Điểm: ${data.getOneResult.result.score}`}</span>
          )}
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("exam_left")}>
          {data &&
            data?.getOneResult?.result?.exam?.questions?.map(
              (question: Question, index: number) => {
                return (
                  <QuestionItem
                    register={register}
                    question={question}
                    key={index}
                    number={index}
                    disabled={true}
                    userOption={JSON.parse(
                      data.getOneResult.result.userAnswer
                    ).find(
                      (userAnwser: UserOption) =>
                        userAnwser.id === String(question.id)
                    )}
                  />
                );
              }
            )}
        </div>
        <div className={cx("exam_right")}>
          <div className={cx("exam_record")}>
            <h2 className={cx("exam_record-heading")}>Phương án trả lời</h2>
            <table>
              <thead>
                <tr>
                  <th>Câu hỏi</th>
                  <th>Đáp án</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>B</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>C</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>D</td>
                </tr>
              </tbody>
            </table>
            {/* <button
              className={cx("submit_exam")}
              onClick={() => setOpenModal(true)}
            >
              Nộp bài
            </button> */}
          </div>
        </div>
      </div>
      <ModalCustom
        title="Bạn có chắc chắn muốn nộp bài ?"
        open={openModal}
        setOpen={setOpenModal}
        cancelAction={() => setOpenModal(false)}
        action={handleSubmitExam}
      />
    </div>
  );
}
export default Exam;
