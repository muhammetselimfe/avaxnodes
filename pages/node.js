import Head from 'next/head'

import { useRouter } from 'next/router'

import Node, { GET_NODE } from '../components/Node';
import Layout from '../components/Layout';
import { defaultLocale } from '../locales'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

import styles from '../styles/Home.module.css'

export default function NodePage(props) {
  const router = useRouter()

  const currentLocale = ((router || {}).query || {}).locale || defaultLocale
  const currentRoute = `${((router || {}).route || 'home').replace('/', '')}`

  return (
    <div className={styles.container}>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Avaxnodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout {...props} currentLocale={currentLocale} currentRoute={currentRoute}>
        <Node router={router} currentLocale={currentLocale} currentRoute={currentRoute} />
      </Layout>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const params = new URLSearchParams(`${ctx.resolvedUrl}`.split('?')[1] || '');
  const currentLocale = params.get('locale') || defaultLocale

  const apolloClient = initializeApollo()

  console.log('Node.getServerSideProps params', params, ctx, ctx.query)

  await apolloClient.query({
    query: GET_NODE,
    variables: {
      filter: {
        nodeID: params.get('id') ||  ctx.query.id,
        page: 1,
        perPage: 10,
      }
    },
  })

  return addApolloState(apolloClient, {
    props: {
      currentLocale
    },
  })
};
