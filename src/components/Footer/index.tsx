import Typography from "@material-ui/core/Typography";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Typography variant="body2" align="center">
        © Technical University of Cologne, 2020
      </Typography>
    </footer>
  );
}
