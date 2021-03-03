import { useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import tw from 'twin.macro'
import AppLayout from 'components/AppLayout'
import Header from 'components/Header'
import Search from 'components/Search'

const IndexPage: NextPage = () => {
  const [isInputInFocus, setIsInputInFocus] = useState(false)

  return (
    <AppLayout>
      <Header backgroundColor="red-700">
        <Link href="/">
          <a css={[tw`mr-2 min-w-max`, isInputInFocus && tw`hidden sm:block`]}>
            <Image src="/logo.png" width={150} height={45} layout="intrinsic" />
          </a>
        </Link>

        <Search
          css={tw`flex flex-auto min-w-0 max-w-full sm:max-w-sm`}
          onFocus={() => setIsInputInFocus(true)}
          onBlur={() => setIsInputInFocus(false)}
        />
      </Header>
    </AppLayout>
  )
}

export default IndexPage
