import Head from 'next/head'
import Routes from '../routes';

import { useIntl } from "react-intl"
import { useRouter } from 'next/router'
import get from 'lodash/get'

import Node, { GET_NODE } from '../components/Node';
import Layout from '../components/Layout';
import { defaultLocale } from '../locales'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

import styles from '../styles/Home.module.css'
import pickParams from '../utils/pickParams';

export default function NodePage(props) {
  const defaultRouter = useRouter()
  const router = Routes.match(defaultRouter.asPath)

  const currentLocale = get(router, 'route.locale') || get(defaultRouter, 'locale', defaultLocale) || defaultLocale

  const currentRoute = get(router, 'query.nextRoute', 'node')

  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Avaxnodes - {f('page.node.title')} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout {...props} currentLocale={currentLocale} currentRoute={currentRoute}>
        <Node router={router} currentLocale={currentLocale} currentRoute={currentRoute} />
      </Layout>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const params = new URLSearchParams(`${ctx.resolvedUrl}`.split('?')[1] || '');
  const currentLocale = params.get('locale') || defaultLocale

  const router = Routes.match(ctx.resolvedUrl)

  if (!router || (router && !router.route)) {
    return {
      props: {
        currentLocale
      }
    }
  }

  if (
    !get(router, 'params.page') ||
    get(router, 'params.page') === 'undefined' ||
    !get(router, 'params.perPage') ||
    get(router, 'params.perPage') === 'undefined'
  ) {
    return {
      redirect: {
        permanent: false,
        destination: router.route.getAs({
          id: router.params.id,
          page: 1,
          perPage: 10,
        })
      }
    }
  }

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_NODE,
    variables: {
      filter: pickParams({
        nodeID: get(router, 'params.id') ||  ctx.query.id,
        page: +get(router, 'params.page') || 1,
        perPage: +get(router, 'params.perPage') || 10,
      })
    },
  })

  return addApolloState(apolloClient, {
    props: {
      currentLocale
    },
  })
};
