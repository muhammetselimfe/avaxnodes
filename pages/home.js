// import React from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
// import { useDarkMode } from 'next-dark-mode'

import Nodes, { GET_NODES } from '../components/Nodes';
import Layout from '../components/Layout';
import { defaultLocale } from '../locales'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

import styles from '../styles/Home.module.css'

export default function Home(props) {
  const router = useRouter()

  const currentLocale = ((router || {}).query || {}).locale || defaultLocale
  const currentRoute = `${((router || {}).route || 'home').replace('/', '')}`

  console.log('Home', router, currentRoute, currentLocale)

  // const { darkModeActive } = useDarkMode()

  // React.useEffect(() => {
  //   document.querySelector("body").classList.toggle('mode-dark', darkModeActive)
  // }, [darkModeActive]);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Avaxnodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout {...props} currentLocale={currentLocale} currentRoute={currentRoute} router={router}>
        <Nodes currentLocale={currentLocale} currentRoute={currentRoute} />
      </Layout>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const params = new URLSearchParams(`${ctx.resolvedUrl}`.split('?')[1] || '');
  const currentLocale = params.get('locale') || defaultLocale

  const apolloClient = initializeApollo()

  try {
    await apolloClient.query({
      query: GET_NODES,
      variables: {
        filter: {
          filter: '',
          page: 1,
          perPage: 10,
        }
      },
    })
  } catch (e) {
    console.log(e.networkError)
  }


  return addApolloState(apolloClient, {
    props: {
      currentLocale
    },
  })
};
