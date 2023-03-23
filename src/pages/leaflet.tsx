import React, { useState, useRef } from "react"
import Header from '../components/header'
import Footer from '../components/footer'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'

function DisplayPosition({ map }) {
  const onClick = () => {
    map.setView([51.505, -0.09], 13)
  }

  return (
    <button onClick={onClick}>To London</button>
  )
}

function Markers() {
  const [marks, setMarks] = useState([
    { name: 'tc', lat: 39.16879, lng: -120.14199 }
  ]);

  const map = useMapEvents({
    zoom: () => {
      if (map.getZoom() > 12) {
        console.log('show popup');
        setMarks([
          // ...marks, // if i want to keep the previous ones
          { name: 'store', lat: 39.17123, lng: -120.14093 },
          { name: 'beach', lat: 39.16879, lng: -120.14199 }
        ]);
      }

      if (map.getZoom() < 12) {
        console.log('hide popup');
        // remove the last item in the array
        setMarks([
          // ...marks, // if i want to keep the previous ones
          { name: 'tc', lat: 39.16879, lng: -120.14199 }
        ]);
      }
    },
  })

  return (
    <>
      {marks.map((mark, index) => (
        <Marker key={index} position={[mark.lat, mark.lng]}>
          <Popup>
            {mark.name}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

function Map() {
  const [mapped, setMapped] = useState(null)
  const ref = useRef(null);

  return (
    <>
      {mapped ? <DisplayPosition map={mapped} /> : null}
      <MapContainer
        // move this to a component with props on whats needed per page
        // TODO change this to a classname
        // this could be interesting as a container query
        style={{ height: '400px' }}
        center={[39.164, -120.149]}
        zoom={12}
        ref={setMapped}
        scrollWheelZoom={false}
        // https://github.com/PaulLeCam/react-leaflet/issues/841
        // ref={ref}
        whenCreated={map => {
          <>
            ref={ref}
          </>
        }}
      >
        <Markers />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}

const LeafletPage = () => {

  return (
    <>
      <Header />
      <Map />
      <Footer />
    </>

  )
}

export default LeafletPage

