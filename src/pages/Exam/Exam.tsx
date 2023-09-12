import { useMutation, useQuery } from "@apollo/client";
import classNames from "classnames/bind";
import { useState } from "react";
import Countdown from "react-countdown";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Clock } from "../../components/icons/Icon";
import ModalCustom from "../../components/modalCustom/ModalCustom";
import QuestionItem from "../../components/questionItem/QuestionItem";
import { CREATE_RESULT } from "../../graphql/mutation/Result";
import { GET_RESULT } from "../../graphql/query/Result";
import { Question } from "../../types/Question";
import { optionsTransfer } from "../../utils/optionsTranfer";
import styles from "./Exam.module.scss";

const cx = classNames.bind(styles);

export interface DataExam {
  [key: string]: string | string[] | null;
}
function Exam() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
  } = useForm();
  const { id } = useParams();

  const [openModal, setOpenModal] = useState<boolean>(false);

  //get questions from exam
  const { data } = useQuery(GET_RESULT, {
    variables: { examId: Number(id) },
  });

  const [createResult, _] = useMutation(CREATE_RESULT);

  const handleSubmitExam = async (data: DataExam) => {
    // logic submit
    const newData: {
      id: string;
      options: string[];
    }[] = [];

    // format data to send to server
    for (const key in data) {
      if (typeof data[key] === "string") {
        newData.push({
          id: key,
          options: [data[key] as string],
        });
      } else {
        if (data[key] === null || typeof data[key] === "boolean") {
          newData.push({
            id: key,
            options: [],
          });
        } else {
          newData.push({
            id: key,
            options: data[key] as string[],
          });
        }
      }
    }

    //call api create result
    const result = await createResult({
      variables: { options: newData, examId: Number(id) },
    });
    //navigate to score
    if (result.data.createResult.code === 200) {
      navigate(`/score/${result.data.createResult.result.id}`, {
        replace: true,
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("section")}>
        <h1 className={cx("header")}>Bài đánh giá Thông tin dịch vụ VSEC</h1>
        <div className={cx("exam_time")}>
          <div className={cx("exam_time-icon")}>
            <Clock />
          </div>
          {data && (
            <span className={cx("exam_time-left")}>
              <Countdown
                date={
                  Date.now() +
                  (data.getResult.result?.exam?.time * 60 * 1000 +
                    Date.parse(data.getResult.result?.timeStart) -
                    Date.now())
                }
                onComplete={handleSubmit(handleSubmitExam)}
              />
            </span>
          )}
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("exam_left")}>
          {data &&
            data.getResult.result?.exam?.questions?.map(
              (question: Question, index: number) => {
                return (
                  <QuestionItem
                    register={register}
                    question={question}
                    key={index}
                    number={index}
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
                {data &&
                  data.getResult.result?.exam?.questions?.map(
                    (question: Question, index: number) => {
                      const userAnswers = watch();
                      const options = userAnswers[question.id];
                      let indexNumber: number | number[] = [];
                      if (typeof options === "object") {
                        const findIndexOfOption = () => {
                          return options?.map((option: string) =>
                            question.options?.findIndex((ele) => ele === option)
                          );
                        };
                        indexNumber = findIndexOfOption();
                      } else {
                        const findIndexOfOption = (element: string) =>
                          element === options;
                        indexNumber =
                          question.options?.findIndex(findIndexOfOption);
                      }

                      return (
                        <tr key={question.id}>
                          <td>{index + 1}</td>
                          <td>
                            {typeof indexNumber === "object"
                              ? indexNumber
                                  .map((value: number) =>
                                    optionsTransfer(value)
                                  )
                                  .toString()
                              : typeof indexNumber === "number"
                              ? optionsTransfer(indexNumber)
                              : ""}
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
            <button
              className={cx("submit_exam")}
              onClick={() => setOpenModal(true)}
            >
              Nộp bài
            </button>
          </div>
        </div>
      </div>
      <ModalCustom
        title="Bạn có chắc chắn muốn nộp bài ?"
        open={openModal}
        setOpen={setOpenModal}
        cancelAction={() => setOpenModal(false)}
        action={handleSubmit(handleSubmitExam)}
      />
    </div>
  );
}
export default Exam;
