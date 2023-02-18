// TODO waiting on info from Andy

import * as React from "react"

import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';

import Header from "../../components/header";
import Footer from "../../components/footer";

// import BookNow from "../../components/peek/book-now";
import Store from "../../components/locations/store";

const TruckeeRiverPage = () => {

  return (
    <>
      <Header />
      <main className="">
        <article className="info">
          {/* classes relate to grid area */}
          <h1>Truckee River Rentals</h1>
          <p>Rentals for the river</p>
        </article>

        {/* <BookNow /> */}

        <div className="here__location here__card">
          <section className="location">
            <Store />
          </section>
        </div>

      </main>

      <Footer />
    </>
  )
}

export default TruckeeRiverPage

export const Head = () => {
  return (
    <SEO
      title={`Rentals | ${useSiteName()}`}
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our demos."
    />
  )
}
