import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";

const Shop = () => {

  const { strapiShop } = useStaticQuery(graphql`
    query ShopQuery {
      strapiShop {
        text {
          data {
            text
          }
        }
      }
    }
  `)

  return (
    <Markdown>
      {strapiShop.text.data.text}
    </Markdown>
  )
}

export default Shop