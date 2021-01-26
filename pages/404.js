import Head from 'next/head'
import { useRouter } from 'next/router'

import { defaultLocale } from '../locales'
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
      </Head>

      <Layout {...props} currentLocale={currentLocale} router={router} currentRoute={currentRoute}>
        <h1 className={styles.title}>
          404
        </h1>
      </Layout>
    </>
  )
}
