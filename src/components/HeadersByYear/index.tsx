import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import styles from "./HeadersByYear.module.scss";

export function HeadersByYearContainer() {
  const { period } = useSelector((state: RootState) => state);
  return <HeadersByYearComponent period={period} />;
}

interface Props {
  period: [number, number];
}

export function HeadersByYearComponent({ period }: Props) {
  const [start, end] = period;
  const list = [];
  for (let year = start; year <= end; year++) {
    list.push(year);
  }
  return (
    <div className={styles.container}>
      {list.map((year, i) => {
        return <div className={styles.item}>{i % 2 == 0 ? year.toString().slice(2) : ""}</div>;
      })}
    </div>
  );
}
