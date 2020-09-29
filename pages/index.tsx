import Head from 'next/head'
import React, { FunctionComponent, useState } from 'react'

const Home: FunctionComponent = () => {
  const [seconds, setSeconds] = useState(0)
  const intervalId = setInterval(() => setSeconds(seconds + 1), 2000)

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <main>
        <h1>Homepage Component</h1>
        <p>{seconds}</p>
      </main>
    </>
  )
}

export default Home
