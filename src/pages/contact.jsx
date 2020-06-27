import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
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
                name="Christian Noss"
                occupation="Project manager"
                phone="123456789"
                email="email@example.com"
                avatar="https://avatars1.githubusercontent.com/u/2807738?s=400&u=9a2598245fb107dd1131ad1cff84069798862457&v=4"
              />
              <Profile
                name="Anonymus"
                occupation="Developer"
                phone="123456789"
                email="email@example.com"
              />
              <Profile
                name="Anonymus"
                occupation="Designer"
                phone="123456789"
                email="email@example.com"
              />
              <Profile
                name="Anonymus"
                occupation="Random person"
                phone="123456789"
                email="email@example.com"
              />
            </div>
          </div>
          <footer className={styles.footer}>
            <Typography variant="body2" align="center">
              © Technische Hochschule Köln, 2020
            </Typography>
          </footer>
        </div>
      </Layout>
    </React.Fragment>
  );
}
