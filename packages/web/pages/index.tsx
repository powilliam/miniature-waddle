import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useFeatures } from "@packages/firebase/hooks";
import { features } from "@packages/firebase/server-side";

import styles from "../styles/Home.module.css";

export interface HomeServerSideProps {
  features?: ReturnType<typeof useFeatures>;
}

const Home: NextPage = () => {
  const features = useFeatures();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>{`${JSON.stringify(features)}`}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  HomeServerSideProps
> = async () => {
  try {
    return { props: { features: await features() } };
  } catch (e) {
    return { props: {} };
  }
};

export default Home;
