import React, { FunctionComponent } from 'react'

import Head from 'next/head'
import Timer from 'components/timer'

const Home: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <main>
        <h1>Homepage Component</h1>
        <Timer />
      </main>
    </>
  )
}

export default Home
