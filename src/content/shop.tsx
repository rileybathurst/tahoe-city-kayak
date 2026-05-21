import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";

type RetailItem = {
  slug: string;
  sport: { slug: string };
};

type BrandNode = {
  name: string;
  slug: string;
  retail?: Array<RetailItem> | null;
};

const Shop = () => {

  const data = useStaticQuery(graphql`
    query ShopQuery {
      strapiShop {
        text {
          data {
            text
          }
        }
      }

      allStrapiBrand {
        nodes {
          name
          slug

          retail {
            slug 
            sport {
              slug
            }
          }
        }
      }
    }
  `)

  // console.log(data.strapiShop.text.data.text)

  const publishedBrands = (data.allStrapiBrand.nodes as BrandNode[])
    .filter((brand: BrandNode) => Array.isArray(brand.retail) && brand.retail.length > 0);

  const kayakBrands = publishedBrands
    .filter((brand: BrandNode) => (brand.retail ?? []).some((item) => item.sport?.slug === "kayak"));

  const paddleboardBrands = publishedBrands
    .filter((brand: BrandNode) => (brand.retail ?? []).some((item) => item.sport?.slug === "paddleboard"));

  const kayakBrandLinks = kayakBrands
    .map((brand: BrandNode) => `[${brand.name}](/retail/kayak/${brand.slug}/)`)
    .join(", ");

  const paddleboardBrandLinks = paddleboardBrands
    .map((brand: BrandNode) => `[${brand.name}](/retail/paddleboard/${brand.slug}/)`)
    .join(", ");

  const cleanedMarkdown = data.strapiShop.text.data.text.replace(/\r?\n?```[\t ]*\r?\nbrands\r?\n```[\t ]*\r?\n?/gi, `kayaks brands such as ${kayakBrandLinks} and paddleboard brands such as ${paddleboardBrandLinks}`);
  // console.log(cleanedMarkdown)

  return (
    <div className="react-markdown">
      <Markdown>{cleanedMarkdown}</Markdown>
    </div>
  )
}

export default Shop