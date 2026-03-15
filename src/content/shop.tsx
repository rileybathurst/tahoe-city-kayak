import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";

type BrandNode = {
  slug: string;
  retail?: Array<{ slug: string }> | null;
};

const getSlugFromHref = (href: string) => {
  const cleanHref = href.split("?")[0].split("#")[0].replace(/\/$/, "");
  const parts = cleanHref.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
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
          slug

          retail {
            slug
          }
        }
      }
    }
  `)

  // console.log(data.strapiShop.text.data.text)

  const publishedBrandSlugs = (data.allStrapiBrand.nodes as BrandNode[])
    .filter((brand: BrandNode) => Array.isArray(brand.retail) && brand.retail.length > 0)
    .map((brand: BrandNode) => brand.slug);

  // console.log(publishedBrandSlugs);

  const cleanedMarkdown = data.strapiShop.text.data.text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (fullMatch: string, linkText: string, href: string) => {
      const slug = getSlugFromHref(href);
      return publishedBrandSlugs.includes(slug) ? fullMatch : linkText;
    }
  );

  return (
    <div className="react-markdown">
      <Markdown>{cleanedMarkdown}</Markdown>
    </div>
  )
}

export default Shop