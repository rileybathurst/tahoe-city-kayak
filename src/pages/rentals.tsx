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
import { StaticImage } from "gatsby-plugin-image";

import { useStrapiRental } from "../hooks/use-strapi-rental";

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
        local: {slug: {eq: "tahoe-city"}}
      }
    ) {
      nodes {
        ...locationCardFragment
      }
    }

    strapiRiver {
      title
      description {
        data {
          description
        }
      }
    }

    strapiLocale(slug: {eq: "tahoe-city"}) {
      peek_tours
      season_start
      season_end
      phone
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
              background={false}
              season_start={data.strapiLocale.season_start}
              season_end={data.strapiLocale.season_end}
              phone={data.strapiLocale.phone}
              {...data.allStrapiLocation}
            />
            <h2>Commons Beach Rentals</h2>
            <div className="react-markdown">
              <Markdown>
                {useStrapiRental().text.data.text}
              </Markdown>
            </div>
            <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>
            {/* <p><Link to="/rentals/truckee-river">Learn about our Truckee River rentals</Link></p> */}
            {/* // TODO should this be a dropdown? */}

            <hr />

            <h2>{data.strapiRiver.title}</h2>

            <Markdown
            // className="react-markdown"
            >
              {data.strapiRiver.description.data.description}
            </Markdown>

            <hr />

            <BookNow />
          </div>

        </article>

        <div>
          <div className="condor">
            <Composition />
            <hr />
            <StaticImage
              src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/rentals/river/451012595_18446794813053197_8261143790293663408_n.jpg"
              alt="Truckee River inflatable kayak"
            />
            <hr />
            <StaticImage
              src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/rentals/river/86286_02_Orange_na_Left_060923_1000x1000.jpg"
              alt="Truckee River inflatable tube"
            />
          </div>
        </div>

        {/* // ? why is this not the regular one? */}
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
              <React.Fragment key={addon.name}>
                <hr />
                <h4>{addon.name}</h4>
                <p><strong>Single</strong> +${addon.single}</p>
                <p><strong>Double</strong> +${addon.double}</p>
                <p><strong>Paddle Board</strong> +{addon.sup}</p>
                <hr />
              </React.Fragment>
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
      description={useStrapiRental().excerpt}
    />
  )
}
