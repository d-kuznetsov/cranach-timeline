import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/pages/ContactPage.module.scss";

export default function ContactPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout heightLimit={false}>
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <Typography variant="h2" component="h2" gutterBottom>
              Contacts
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
            <div className={styles.profiles}>
              <Profile
                name="Dmitry Kuznetsov"
                occupation="Developer"
                email="dmitrii.kuznetcov@smail.th-koeln.de"
                avatar="https://avatars1.githubusercontent.com/u/57637723?s=460&u=28a67642b34f1440defcdedb2bb49d9e8b56d528&v=4"
              />
              <Profile
                name="Sarfaroz Khakimov"
                occupation="Designer, Developer"
                email="sarfaroz.khakimov@smail.th-koeln.de"
                avatar="https://avatars1.githubusercontent.com/u/56966962?s=460&u=240519baff9949f25fd6fceacaa9790152d7a336&v=4"
              />
              <Profile name="Nazi" occupation="Top Manager" email="nazi@smail.th-koeln.de" />
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
}
