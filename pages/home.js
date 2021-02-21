// import React from 'react'
import Head from 'next/head'

import { useIntl } from "react-intl"
import { useRouter } from 'next/router'
// import { useDarkMode } from 'next-dark-mode'
// import I18nProvider from 'next-translate/I18nProvider'
import get from 'lodash/get'
import Routes from '../routes';

import Nodes, { GET_NODES } from '../components/Nodes';
import Layout from '../components/Layout';
import { defaultLocale } from '../locales'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

import styles from '../styles/Home.module.css'
import pickParams from '../utils/pickParams';

export default function Home(props) {
  const defaultRouter = useRouter()
  const router = Routes.match(defaultRouter.asPath)

  const currentLocale = get(router, 'route.locale') || get(defaultRouter, 'locale', defaultLocale) || defaultLocale

  const currentRoute = get(router, 'query.nextRoute', 'home')

  // console.log('Home', currentRoute, currentLocale, router, props.currentLocale, props)

  // const { darkModeActive } = useDarkMode()

  // React.useEffect(() => {
  //   document.querySelector("body").classList.toggle('mode-dark', darkModeActive)
  // }, [darkModeActive]);

  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })

  return (
    <>
      {/* <I18nProvider lang={currentLocale}> */}
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Avaxnodes {f('page.nodes.title')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout {...props} currentLocale={currentLocale} currentRoute={currentRoute} router={router}>
          <Nodes currentLocale={currentLocale} currentRoute={currentRoute} router={router} />
        </Layout>
      {/* </I18nProvider> */}
    </>
  )
}

// export const getInitialProps = async ({query}) => {
//   // query.slug
//   console.log(query)
// }

export const getServerSideProps = async (ctx) => {
  const params = new URLSearchParams(`${ctx.resolvedUrl}`.split('?')[1] || '');
  const currentLocale = ctx.locale || defaultLocale

  const router = Routes.match(ctx.resolvedUrl)

  // console.log(currentLocale, params, ctx.resolvedUrl, router)

  const apolloClient = initializeApollo()

  try {
    await apolloClient.query({
      query: GET_NODES,
      variables: {
        filter: pickParams({
          filter: router.query.page || '',
          page: +router.query.page || 1,
          perPage: +router.query.perPage || 10,
        })
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
