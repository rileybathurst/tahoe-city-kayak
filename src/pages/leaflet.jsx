import React, { useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { useMapEvents } from 'react-leaflet/hooks'




import Header from '../components/header'
import Footer from '../components/footer'



/* function MyComponent() {
  const map = useMap()
  console.log('map center:', map.getCenter()); // this isnt in the object?
  console.log('map center:', map.getZoom()); // this isnt in the object?
  console.log(map);
  return null

  // I need to check on updates
} */


function MyComponent() {

  const [marks, setMarks] = useState([
    {name: 'tc', lat: 39.16879, lng: -120.14199}
  ]);

  const map = useMapEvents({
    zoom: () => {
      // console.log("🦄 zoom", map.getZoom())
      if (map.getZoom() > 12) {
        console.log('show popup');
        setMarks([
        // ...marks, // if i want to keep the previous ones
          {name: 'store', lat: 39.17123, lng: -120.14093},
          {name: 'beach', lat: 39.16879, lng: -120.14199}
        ]);
      }

      if (map.getZoom() < 12) {
        console.log('hide popup');
        // remove the last item in the array
        setMarks([
          // ...marks, // if i want to keep the previous ones
          {name: 'tc', lat: 39.16879, lng: -120.14199}
        ]);
      }
    },

/*     Rclick() {
      map.flyTo([39.16879, -120.14199], 12)
    }, */


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

  const ref = useRef(null);

/*   useEffect(() => {
    console.log(ref);
    // console.log(ref.current);
    // console.log(ref.current?._zoom);
  }, []); */

  // const center = [51.505, -0.09]
  // const zoom = 13


  return (
    <>
    {/* <button onClick={Rclick}>reset</button> */}
    <MapContainer
      // move this to a component with props on whats needed per page
      // TODO change this to a classname
      // this could be interesting as a container query
      style={{ height: '400px' }}
      center={[39.164, -120.149]}
      zoom={12}
      scrollWheelZoom={false}
    // ref={ref} // https://github.com/PaulLeCam/react-leaflet/issues/841
    whenCreated={map => {
      <>
      {/* // do whatever makes sense. I've set it to a ref */}
      ref={ref}
      </>
      }}
    >

<MyComponent />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

{/* <Marker position={[39.17123, -120.14093]}>
            <Popup>
              Store
            </Popup>
          </Marker> */}

    </MapContainer>
    </>
  )
}

const CurvePage = () => {

  return (
<>
<Header />
    <Map />
    <Footer />
</>

  )
}

export default CurvePage

