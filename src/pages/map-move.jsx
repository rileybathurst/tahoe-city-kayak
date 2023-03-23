import React, { useState } from "react"
import Header from '../components/header'
import Footer from '../components/footer'

import { MapContainer, TileLayer } from 'react-leaflet'

function DisplayPosition({ map }) {
  const onClick = () => {
    map.setView([51.505, -0.09], 13)
  }

  return (
    <button onClick={onClick}>To London</button>
  )
}

function ExternalStateExample() {
  const [zap, setZap] = useState(null)

  return (
    <>
      {zap ? <DisplayPosition map={zap} /> : null}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        ref={setZap}
        style={{ height: '400px' }}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}


const MovePage = () => {
  return (
    <>
      <Header />
      <ExternalStateExample />
      <Footer />
    </>
  )
}

export default MovePage

