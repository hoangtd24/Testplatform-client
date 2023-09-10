import { useMutation, useQuery } from "@apollo/client";
import classNames from "classnames/bind";
import ExamItem from "../../components/examItem/ExamItem";
import { DoubleArrow } from "../../components/icons/Icon";
import { INIT_RESULT } from "../../graphql/mutation/Result";
import { GET_EXAMS } from "../../graphql/query/Exam";
import { Exam } from "../../types/Exam";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
  const { data, loading, fetchMore } = useQuery(GET_EXAMS, {
    variables: {
      limit: 4,
    },
    notifyOnNetworkStatusChange: true,
  });
  console.log(data);

  const [initResult, _] = useMutation(INIT_RESULT);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1 className={cx("header")}>Thi online</h1>
        <div className={cx("content")}>
          {data &&
            data.getExams?.paginatedExams?.map((exam: Exam) => (
              <ExamItem initResult={initResult} exam={exam} key={exam.id} />
            ))}
        </div>
      </div>
      {data && data.getExams.hasMore && (
        <button
          className={cx("see_more-btn")}
          onClick={() => {
            fetchMore({
              variables: {
                limit: 4,
                cursor: data.getExams.cursor,
              },
            });
          }}
        >
          <p className={cx("btn_title")}>Xem thêm</p>
          <div className={cx("icon")}>
            <DoubleArrow />
          </div>
        </button>
      )}
    </div>
  );
}
export default Home;
