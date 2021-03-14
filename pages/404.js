import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { defaultLocale, locales } from '../locales'
import Layout from '../components/Layout'

import styles from '../styles/Home.module.css'

export default function NotFound(props) {
  const router = useRouter()

  const currentLocale = ((router || {}).query || {}).locale || defaultLocale
  const currentRoute = `${((router || {}).route || 'home').replace('/', '')}`

  return (
    <>
      <Head>
        <title>AVALANCHE CAPITAL</title>
        <link rel="icon" href="/static/images/favicon.png" />

        <link rel="canonical" href={router.parsedUrl.href} />
        {locales.map(locale => {
          const localeRoute = Routes.findAndGetUrls(router.route.name, locale, pickParams(router.params))
          return (
            <link
              key={locale}
              rel="alternate"
              hreflang={locale}
              href={`${router.parsedUrl.origin}${localeRoute.urls.as}`}
            />
          )
        })}
      </Head>

      <Layout {...props} currentLocale={currentLocale} router={router} currentRoute={currentRoute}>
        <h1 className={styles.title}>
          404
        </h1>
      </Layout>
    </>
  )
}
