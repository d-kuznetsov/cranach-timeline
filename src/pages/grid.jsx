import Layout from "../components/Layout";
import { LegendContainer as Legend } from "../components/Legend";
import { GridContainer as Grid } from "../components/Grid";
import styles from "../styles/pages/GridPage.module.scss";

export default function GridPage() {
  return (
    <Layout
      toolbar={
        <div>
          <Legend />
        </div>
      }
    >
      <Grid />
    </Layout>
  );
}
