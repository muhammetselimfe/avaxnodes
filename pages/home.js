import Head from 'next/head'

import { useIntl } from "react-intl"
import { useRouter } from 'next/router'
import get from 'lodash/get'
import Routes from '../routes';

import Nodes, { GET_NODES } from '../components/Nodes';
import Layout from '../components/Layout';
import { defaultLocale, locales } from '../locales'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

import styles from '../styles/Home.module.css'
import pickParams from '../utils/pickParams';

export default function Home(props) {
  const defaultRouter = useRouter()
  const router = Routes.match(defaultRouter.asPath)

  const currentLocale = get(router, 'route.locale') || get(defaultRouter, 'locale', defaultLocale) || defaultLocale

  const currentRoute = get(router, 'query.nextRoute', 'home')

  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Avaxnodes {f('page.nodes.title')}</title>
        <link rel="icon" href="/favicon.ico" />

        {router.parsedUrl && (
          <>
            <link rel="canonical" href={router.parsedUrl.href} />
            <>
              {locales.map(locale => {
                const localeRoute = Routes.findAndGetUrls(router.route.name, locale, pickParams(router.params))
                return (
                  <link
                    key={locale}
                    rel="alternate"
                    hrefLang={locale}
                    href={`${router.parsedUrl.origin}${localeRoute.urls.as}`}
                  />
                )
              })}
            </>
          </>
        )}
      </Head>

      <Layout {...props} currentLocale={currentLocale} currentRoute={currentRoute} router={router}>
        <Nodes currentLocale={currentLocale} currentRoute={currentRoute} router={router} />
      </Layout>
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
    get(router, 'params.perPage') === 'undefined' ||
    !get(router, 'params.sorting') ||
    get(router, 'params.sorting') === 'undefined'
  ) {
    return {
      redirect: {
        permanent: false,
        destination: router.route.getAs({
          page: 1,
          perPage: 10,
          sorting: '-fee',
        })
      }
    }
  }

  const apolloClient = initializeApollo()

  try {
    await apolloClient.query({
      query: GET_NODES,
      variables: {
        filter: pickParams({
          filter: get(router, 'params.filter') || '',
          freeSpace: +get(router, 'params.freeSpace') || 0,
          page: +get(router, 'params.page') || 1,
          perPage: +get(router, 'params.perPage') || 10,
          sorting: get(router, 'params.sorting') || '-fee',
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
