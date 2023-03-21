import React, { useRef, useEffect } from "react"

import { MapContainer, TileLayer, Marker, Popup, Polyline, SVGOverlay } from 'react-leaflet'
// import { Curve } from 'react-leaflet-curve' // i cant import this without hitting errors so maybe go back a step

import L from 'leaflet'
import '@elfalem/leaflet-curve'

function Map() {

  var path = L.curve(['M',[50.54136296522163,28.520507812500004],
					'C',[52.214338608258224,28.564453125000004],
						[48.45835188280866,33.57421875000001],
						[50.680797145321655,33.83789062500001],
					'V',[48.40003249610685],
					'L',[47.45839225859763,31.201171875],
						[48.40003249610685,28.564453125000004],'Z'],
  )
					// {color:'red',fill:true}).addTo(map);

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

