import 'styles/globals.css'
import { useState, useEffect } from 'react'
import { GlobalStyles } from 'twin.macro'
import type { AppProps } from 'next/app'
import ErrorPage from 'next/error'
import { Router } from 'next/router'
import AppLayout from 'components/AppLayout'
import Spinner from 'components/Spinner'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => void setLoading(true)
    const end = () => void setLoading(false)

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)

    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  const { error } = pageProps

  return (
    <>
      <GlobalStyles />

      <AppLayout>
        {loading && (
          <>
            <Spinner /> Loading...
          </>
        )}
        {error && <ErrorPage statusCode={error.statusCode} message={error.message} />}
        {!error && !loading && <Component {...pageProps} />}
      </AppLayout>
    </>
  )
}

export default MyApp
