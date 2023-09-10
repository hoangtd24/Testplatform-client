import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export type headerTable = {
  key: string;
  name: string;
  text?: "left";
  children?: {
    key: string;
    name: string;
    text?: "left";
  }[];
};
export interface dataTable<T> {
  header: headerTable[];
  data: T;
  actions: {
    key: "edit" | "delete" | "read";
    name: string;
    icon: JSX.Element;
  }[];
}

const Table = ({ header, data, actions }: dataTable<any>) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Sô thứ tự</th>
          {header.map((item, index) => {
            if (!item.children) {
              return (
                <th key={index} className={cx(item.text)}>
                  {item.name}
                </th>
              );
            } else {
              return item.children.map((item2, index) => {
                return (
                  <th key={index} className={cx(item2.text)}>
                    {item2.name}
                  </th>
                );
              });
            }
          })}
          {actions.map((action, index) => (
            <th key={index}>{action.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item1: any, index: number) => {
          return (
            <tr key={item1.id}>
              <td>{index + 1}</td>
              {header.map((item2, index) => {
                if (!item2.children) {
                  return (
                    <td key={index} className={cx(item2.text)}>
                      {item1[item2.key]}
                    </td>
                  );
                } else {
                  return item2.children.map((item3, index) => {
                    return (
                      <td key={index} className={cx(item3.text)}>
                        {item1[item2.key][item3.key]}
                      </td>
                    );
                  });
                }
              })}
              {actions.map((action, index) => (
                <td key={index} className={cx("pointer")}>
                  <Link to={`/result/${item1.id}`}>{action.icon}</Link>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
