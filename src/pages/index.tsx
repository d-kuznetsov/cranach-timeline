import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/pages/HomePage.module.scss";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        heightLimit={false}
        toolbar={
          <div className={styles.pictureWrap}>
            <img src="/cranach-header.jpg" alt="" />
          </div>
        }
      >
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <Typography variant="h2" component="h2" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1" component="p" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut libero tellus.
              Praesent quis nunc nec risus iaculis bibendum finibus nec ex. Suspendisse sollicitudin
              elit odio, a accumsan libero viverra quis. Integer tempus mi nec turpis rutrum, vitae
              vulputate turpis consectetur. Maecenas vel dolor ornare, pretium magna quis, mattis
              libero. Quisque nec porttitor ante. Nulla placerat accumsan nibh, non finibus dui
              accumsan quis. Donec interdum est justo, porttitor dictum lectus ultricies ut. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tellus massa.
              Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Quisque rutrum nisi mattis nunc ultricies dignissim.
            </Typography>
            <div className={styles.tabDescription}>
              <div>
                <Typography variant="h5" component="h5" color="secondary" gutterBottom>
                  Timeline
                </Typography>
                <Typography variant="body1" component="p">
                  On the timeline tab, artists works are presented as lines on the graph for years
                  along the x axis. You can adjust the time interval and line height, as well as
                  enable or disable the display of a specific category. Clicking on a line opens a
                  viewing window.
                </Typography>
              </div>
              <div>
                <Typography variant="h5" component="h5" color="secondary" gutterBottom>
                  Grid
                </Typography>
                <Typography variant="body1" component="p">
                  On the grid tab you can see the work of artists in the form of a grid of small
                  images sorted by time. You can sort the work of artists using the search field. in
                  addition, you can change the time period and enable or disable the display of
                  certain categories. Clicking on the image opens a viewing window.
                </Typography>
              </div>
              <div>
                <Typography variant="h5" component="h5" color="secondary" gutterBottom>
                  Contact
                </Typography>
                <Typography variant="body1" component="p">
                  If you have questions or suggestions contact information you will find on the
                  contact tab
                </Typography>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
}
