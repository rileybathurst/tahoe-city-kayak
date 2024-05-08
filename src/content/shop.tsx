import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

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
    <Markdown
      children={strapiShop.text.data.text}
      className="react-markdown"
    />
  )
}

export default Shop