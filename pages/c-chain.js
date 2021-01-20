import Head from 'next/head'

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";

import CChain from '../components/CChain';
import Layout from '../components/Layout';

import styles from '../styles/Home.module.css'

export default function Home() {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Avaxnodes</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
          <CChain />
        </Layout>
      </div>
    </ApolloProvider>
  )
}
