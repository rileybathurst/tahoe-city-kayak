import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";

import Deck from "../components/deck";

const DeckPage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
    query DeckTestQuery {
      allStrapiRetail(limit: 2) {
        nodes {
          id
          title
        }
      }
    }
  `)

  return (
    <>
      <Header />

      <h1>Deck test page</h1>

      <Deck cards={allStrapiRetail.nodes} />


      <Footer />
    </>
  )
}

export default DeckPage
