import React, { useRef } from "react"
import { Script } from "gatsby";
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'


// import L from 'leaflet'
// import { curve, Curve } from 'leaflet'; // for TypeScript
import '@elfalem/leaflet-curve'

import Header from "../../components/header";
import Footer from "../../components/footer";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Composition from "../../components/composition";




const TruckeeRiverPage = () => {

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent="rentals"
        title="Truckee River Rentals"
      />

      {/* // TODO: links */}

      <main className="progression">
        <article>
          <h1>Truckee River Rentals</h1>
          <p>
            We offer high end inflatables that you can rent for the Truckee River, as well as inexpensive tubes and rafts for purchase. That said, we are not a livery service with shuttle transportation for the river. You can easily transport our lightweight &#40;inflatable&#41; river-oriented watercraft yourself, or &#40;if you can't self transport&#41; you can choose to rent one of our lake-oriented watercraft and paddle directly from our rental location at the waters&apos; edge on Commons Beach in Tahoe City.
          </p>

          <p>
            Our company does not have the permits to guide or transport you &#40;or your watercraft&#41; to/from the river, but our rental location is just a couple minutes walk, drive, or paddle from the start of the Truckee River &#40;you can see it from our locations&#41;.
          </p>

          <p>
            The section of the Truckee River between Tahoe City and Alpine Meadows is an easy family-friendly float with a couple of "white water" sections that barely register as a Class 1 rapid.  The float trip takes most people around 3 hours to complete &#40;not counting transportation&#41;, and many people use basic tubes as their watercraft.
          </p>

          <h2>
            How to Launch:
          </h2>
          <p>
            The easiest place to launch for the Truckee River is a large public parking lot called "64 Acres" that is located behind the Tahoe City Transportation Center &#40;the public bus station&#41; at 180 West Lake Blvd in Tahoe City. This parking lot has a public boat ramp into the river that's free to use.  You'll need to have a plan to get back to your car at the end of the day &#40;see below&#41;.
          </p>

          <h2>
            How to get back at the end of the day:
          </h2>
          <p>
            You'll want to get out of the river at &#40;or near&#41; the River Ranch Lodge and Restaurant, as there is more dangerous white water just after this location. There are no other large restaurants with outdoor dining and river docks in the area, so it would be very hard to float past the River Ranch by mistake.
          </p>

          <h2>
            A few options for getting back to your car include:
          </h2>

          <ol>
            <li>
              There is a public parking area less than 100 yards upstream from River Ranch where you can leave a second car. Please do not park in the River Ranch's parking lot unless you are patronizing their restaurant &#40;we highly recommend their food&#41;.
            </li>
            <li>
              Public transportation options include the  TART bus &#40;the public bus that stops at River Ranch hourly&#41;, TART Connect &#40;a free public van service&#41;, or local UBER/Taxi options. You could deflate your watercraft and use these options to get back to your vehicle.
            </li>
            <li>
              Before you begin your river float, you could lock a bike near the take-out and, when you exit the river a few hours later, have one person in your group ride back to your parked car using the scenic bike path that follows the Truckee River.
            </li>
          </ol>

          <p>
            You are responsible for your watercraft, whether you've rented it or purchased it. Please do not leave deflated tubes, rafts, or trash along the side of the road or riverbank!  You will be financially responsible for replacing lost or broken rental equipment.
          </p>

          <p>
            Please note that while the Truckee River rarely closes to the public, there are times when weather-related events like drought or excessive snowmelt can create conditions where it's too shallow &#40;or too deep&#41; for a good floating experience. We always recommend kayaking or paddleboarding with us on uniquely beautiful Lake Tahoe, regardless of river conditions.
          </p>

          <h3>Examples of our river-oriented inflatables:</h3>
          <ul>
            <li><a href="https://www.nrs.com/star-karma-river-tube/paka" target='_blank' rel='noopener noreferrer'>STAR Karma River Tube | NRS</a></li>
            <li><a href="https://www.nrs.com/star-viper-xl-inflatable-kayak/p1w8" target='_blank' rel='noopener noreferrer'>STAR Viper XL Inflatable Kayak | NRS</a></li>
            <li><a href="https://www.nrs.com/nrs-outlaw-legend-ii-inflatable-kayak/p8bn" target='_blank' rel='noopener noreferrer'>NRS Outlaw Legend II Inflatable Kayak</a></li>
          </ul>
        </article>
        {/* <Composition /> */}
        <MapContainer
          // move this to a component with props on whats needed per page
          // TODO change this to a classname
          // this could be interesting as a container query
          style={{ height: '400px' }}
          center={[39.164, -120.149]}
          zoom={12}
          scrollWheelZoom={false}
        // ref={useRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline
            // positions={[39.17123, -120.14093][39.18576, -120.19524]}
            positions={[
              [39.17123, -120.14093],
              [39.18576, -120.19524]
            ]}
          />

          <Marker position={[39.17123, -120.14093]}>
            <Popup>
              Store
            </Popup>
          </Marker>

          <Marker position={[39.16879, -120.14199]}>
            <Popup>
              Beach Rental
            </Popup>
          </Marker>

          <Marker position={[39.16490, -120.14587]}>
            <Popup>
              64 Acres Parking
            </Popup>
          </Marker>

          <Marker position={[39.16514, -120.14727]}>
            <Popup>
              Launch
            </Popup>
          </Marker>

          <Marker position={[39.18576, -120.19524]}>
            <Popup>
              River Ranch
            </Popup>
          </Marker>

        </MapContainer>
      </main>

      <Footer />
    </>
  )
}

export default TruckeeRiverPage

export const Head = () => {
  return (
    <SEO
      title={`Truckee River Rentals | ${useSiteName()}`}
      description="We offer high end inflatables that you can rent for the Truckee River, as well as inexpensive tubes and rafts for purchase"
    >
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Rentals",
              "item": "${useSiteUrl()}/rentals"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Truckee River Rentals"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
