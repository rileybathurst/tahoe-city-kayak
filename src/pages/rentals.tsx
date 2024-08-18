import * as React from "react"
import { Link, graphql, useStaticQuery } from 'gatsby';
import Markdown from "react-markdown";

// Paddle
import { PaddleLocationDeck } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import BookNow from "../components/peek/book-now";
import Composition from "../components/composition";


const RentalsPage = () => {

  const data = useStaticQuery(graphql`
  query RentalsQuery {
    allStrapiRentalRate(sort: {order: ASC}) {
      nodes {
        id
        oneHour
        item
        threeHour
        fullDay
      }
    }

    allStrapiRentalAddon {
      nodes {
        name
        single
        double
        sup
      }
    }

    allStrapiLocation(
      filter: {
        name: {in: ["On Water Rental", "Free Parking Lot"]}
        locale: {slug: {eq: "tahoe-city"}}
      }
    ) {
      nodes {
        ...locationCardFragment
      }
    }

    strapiRental {
      text {
        data {
          text
        }
      }
    }

  }
`)

  return (
    <>
      <Header />
      <main className="albatross wrap">
        <article>
          <div className="condor">
            <h1>Rentals</h1>
            <PaddleLocationDeck
              {...data.allStrapiLocation}
              background={false}
            />
            <Markdown className="react-markdown">
              {data.strapiRental.text.data.text}
            </Markdown>
            {/* <p><Link to="/rentals/truckee-river">Learn about our Truckee River rentals</Link></p> */}
            {/* // TODO should this be a dropdown? */}
            <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>
            <hr />

            <BookNow />
          </div>

        </article>

        <div>
          <div className="condor">
            <Composition />
          </div>
        </div>

        {/* // TODO: widths on ipad is weird */}
        <div className="charts">
          <div className="rates">
            <div className="specialty_rentals rental-chart">
              <div className="row row-header">
                <h4><span>Rental</span> <span>Rates</span></h4>
                <p>1 Hour</p>
                <p><span>3 Hours</span></p>
                <p><span>Full Day</span></p>
              </div>
              {data.allStrapiRentalRate.nodes.map((rate: {
                id: React.Key;
                item: string;
                oneHour: number;
                threeHour: number;
                fullDay: number;
              }) => (
                <div key={rate.id} className="row">
                  <h4>{rate.item}</h4>
                  <p>{rate.oneHour}</p>
                  <p>{rate.threeHour}</p>
                  <p>{rate.fullDay}</p>
                </div>
              ))}
            </div>

            <hr />

            <h3>Additional Rates</h3>
            {data.allStrapiRentalAddon.nodes.map((addon) => (
              <>
                <hr />
                <h4>{addon.name}</h4>
                <p><strong>Single</strong> +${addon.single}</p>
                <p><strong>Double</strong> +${addon.double}</p>
                <p><strong>Paddle Board</strong> +{addon.sup}</p>
                <hr />
              </>
            ))}

          </div>

          <BookNow />
        </div>

      </main >

      <Footer />
    </>
  )
}

export default RentalsPage

export const Head = () => {
  return (
    <SEO
      title='Rentals'
      description="Enjoy the majesty of paddling across the crystal clear waters of Lake Tahoe while kayaking in one of our demos."
    />
  )
}
