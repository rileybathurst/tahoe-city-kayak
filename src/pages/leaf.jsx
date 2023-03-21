import React, { useRef, useEffect } from "react"

import { MapContainer, TileLayer, Marker, Popup, Polyline, SVGOverlay } from 'react-leaflet'
// import { Curve } from 'react-leaflet-curve' // i cant import this without hitting errors so maybe go back a step

import L from 'leaflet'
import '@elfalem/leaflet-curve'

function Map() {



  return (
    <MapContainer
      // move this to a component with props on whats needed per page
      // TODO change this to a classname
      // this could be interesting as a container query
      style={{ height: '400px' }}
      center={[39.164, -120.149]}
      zoom={12}
      scrollWheelZoom={false}
    // ref={ref} // this kinda gets somewhere but will need dropping down to get to where I want
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={[
          [39.17123, -120.14093],
          [39.18576, -120.19524]
        ]}
      />

    </MapContainer>
  )
}

const LeafPage = () => {

  return (

    <Map />

  )
}

export default LeafPage

