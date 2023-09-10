import classNames from "classnames/bind";
import styles from "./SeeResult.module.scss";
import Table from "../../components/table/Table";
import { dataTable } from "../../components/table/Table";
import { Computer } from "../../components/icons/Icon";
import { useQuery } from "@apollo/client";
import { GET_RESULTS_OF_USER } from "../../graphql/query/Result";
const cx = classNames.bind(styles);

export interface Result {
  id: string;
  score: number;
  exam: {
    name: string;
    time: number;
  };
}

type dataState = dataTable<Result[]>;

const SeeResult = () => {
  const { data, loading } = useQuery(GET_RESULTS_OF_USER);
  const results: dataState = {
    header: [
      {
        key: "exam",
        name: "Đợt thi",
        text: "left",
        children: [
          {
            key: "name",
            name: "Tên dợt thi",
          },
          {
            key: "time",
            name: "Thời gian",
          },
        ],
      },
      {
        key: "score",
        name: "Điểm",
      },
    ],
    data: data?.getResults?.results,
    actions: [
      {
        key: "read",
        name: "Xem kết quả",
        icon: <Computer />,
      },
    ],
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("filter")}>
          <div className={cx("filter_wrapper")}>
            <select>
              <option>Đợt thi</option>
              <option>Thông tin dịch vụ VSEC</option>
              <option>Phương pháp tính sizing</option>
              <option>Quy trình sale và kiến thức CRM</option>
            </select>
          </div>
        </div>
        <div className={cx("table")}>{data && <Table {...results} />}</div>
      </div>
    </div>
  );
};

export default SeeResult;
