import { FC, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import tw, { theme } from 'twin.macro'
import Header from 'components/Header'
import Search from 'components/Search'

const AppLayout: FC = ({ children }) => {
  const [isInputInFocus, setIsInputInFocus] = useState(false)

  return (
    <main>
      <Head>
        <title>Pokedex</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Header backgroundColor={theme`colors.red.700`}>
        <Link href="/">
          <a css={[tw`mr-2 min-w-max cursor-pointer`, isInputInFocus && tw`hidden sm:block`]}>
            <Image src="/logo.png" width={150} height={45} layout="intrinsic" />
          </a>
        </Link>

        <Search
          css={tw`flex flex-auto min-w-0 max-w-full sm:max-w-sm`}
          onFocus={() => setIsInputInFocus(true)}
          onBlur={() => setIsInputInFocus(false)}
        />
      </Header>

      <section className="container my-4 mx-auto sm:my-6">{children}</section>
    </main>
  )
}

export default AppLayout
