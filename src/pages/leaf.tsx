import * as React from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import Header from "../components/header";
import Footer from "../components/footer";

const LeafPage = () => {

  return (
    <>
      <Header />
      <h1 className="passage">Leaf</h1>
      <main>
        <MapContainer
          style={{ height: '400px' }}
          center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </main>

      <Footer />
    </>
  )
}

export default LeafPage
