import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../redux/actions";
import { RootState } from "../redux/types";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getArtworkTitle, getInvolvedPersons, getImageSrc } from "../lib/extractArtworkData";
import Head from "next/head";
import Layout from "../components/Layout";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/pages/ArtworkPage.module.scss";

export default function ArtworkPage() {
  const { artworkToView, artworks } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const queryId = router.query?.id;

  useEffect(() => {
    if (artworks.length && !artworkToView && queryId) {
      // @ts-ignore
      const foundedArtwork = artworks.find((item) => item.objectId == queryId);
      if (foundedArtwork) {
        dispatch(setArtworkToView(foundedArtwork));
      }
    }
  }, [artworks.length, queryId]);

  return (
    <React.Fragment>
      <Head>
        <title>Artwork</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout heightLimit={false}>
        <div className={styles.container}>
          {artworkToView && (
            <main className={styles.mainContent}>
              <div className={styles.description}>
                <Section title="Title" body={getArtworkTitle(artworkToView)} />
                <Section title="Author" body={getInvolvedPersons(artworkToView)} />
                <Section title="Dating" body={artworkToView.dating.dated} />
                <Section title="Owner" body={artworkToView.owner} />
                <Section title="Location" body={artworkToView.locations[0]?.term} />
                <Section title="Description" body="" />
              </div>
              <div className={styles.imageWrap}>
                <img className={styles.image} src={getImageSrc(artworkToView, "m")} alt="" />
              </div>
            </main>
          )}
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

interface SectionProps {
  title: string;
  body: string;
}

const Section = ({ title, body }: SectionProps) => {
  return (
    <section>
      <Typography variant="h6" component="h6" noWrap>
        {title}
      </Typography>
      <Typography variant="body2" component="p" gutterBottom color="textSecondary">
        {body}
      </Typography>
    </section>
  );
};
