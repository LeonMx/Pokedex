import { FC } from 'react'
import Head from 'next/head'

const AppLayout: FC = ({ children }) => (
  <main>
    <Head>
      <title>Pokedex</title>
    </Head>
    {children}
  </main>
)
export default AppLayout
