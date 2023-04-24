import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { Inter } from 'next/font/google'
import Head from 'next/head'

import { SavedMissile } from 'dto'

import { Manager } from 'components/Manager/Manager'

import { useManager } from './hooks/manager/useManager'
import { usePlayground } from './hooks/playground/usePlayground'
import { useMissileRepository } from './hooks/useMissileRepository'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [missiles, setMissiles] = useState<SavedMissile[]>([])

  // const missileRepository = new MissileRepository()

  // const add = (missile: MissileModel) => {
  //   const savedMissile = missileRepository.add(missile)
  //   setMissiles([...missiles, savedMissile])

  //   return savedMissile
  // }

  // const remove = (id: number) => {
  //   setMissiles(missiles.filter((m) => m.id !== id))
  //   missileRepository.remove(id)
  // }

  const { missileRepository, add, remove } = useMissileRepository(setMissiles)

  const managers = useManager()

  const { zoom, time, timeAmount, distance, distanceAmount } = managers

  const speed = (distance * distanceAmount) / (time * timeAmount)

  const { playgroundRef, explosionRef, houseRef, missilesRef } = usePlayground(
    speed,
    zoom,
    add,
    remove
  )

  return (
    <>
      <Head>
        <title>Missiles</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: '100vh' }}>
        <Container fluid className="h-100">
          <Row className="h-100">
            <Manager missiles={missiles} pxPerMs={speed} {...managers} />

            <Col id="playground" ref={playgroundRef}>
              <div id="missiles" ref={missilesRef}></div>
              <div id="houses" ref={houseRef}></div>
              <div id="explodes" ref={explosionRef}></div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}
