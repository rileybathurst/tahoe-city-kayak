import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";

const NotFoundPage = () => {
  return (
    <>
      <Header />

      <main className="measure">
        <h2 className="crest">404</h2>

        <h1 className="mixta">Looks like you’ve paddled into uncharted waters!</h1>
        <p>Don’t worry, we’ll help you navigate <Link to="/">back to our homepage.</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

export const Head = () => {
  return (
    <SEO
      title={`404 | ${useSiteName()}`}
      description="Looks like you’ve paddled into uncharted waters! Don’t worry, we’ll help you navigate back to our homepage."
    />
  )
}