import Layout from "../components/Layout";
import { GridContainer as Grid } from "../components/Grid";
import styles from "../styles/pages/GridPage.module.scss";

export default function GridPage() {
  return (
    <Layout toolbar={"toolbar"}>
      <Grid />
    </Layout>
  );
}
