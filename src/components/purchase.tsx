import * as React from "react";
import { graphql, useStaticQuery } from "gatsby"
import { PaddlePurchase } from "@rileybathurst/paddle";
import type { GatsbyImageType } from "@rileybathurst/paddle";

type purchaseTypes = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  length: number;
  width: number;
  inflatable: boolean;
  capacity: number;
  demo: boolean;
  discount?: number;
  cutout: GatsbyImageType;
  sport: {
    slug: string;
  };
  brand: {
    slug: string;
  };
};
const Purchase = ({ id, title, slug, excerpt, length, width, inflatable, capacity, demo, discount, cutout, sport, brand }: purchaseTypes) => {

  const data = useStaticQuery(graphql`
    query {
      baseOne: strapiImagegrab(title: {eq: "BaseOne"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      baseTwo: strapiImagegrab(title: {eq: "BaseTwo"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      baseThree: strapiImagegrab(title: {eq: "BaseThree"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      topOne: strapiImagegrab(title: {eq: "TopOne"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      topTwo: strapiImagegrab(title: {eq: "TopTwo"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      topThree: strapiImagegrab(title: {eq: "TopThree"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  return (
    <PaddlePurchase
      id={id}
      title={title}
      slug={slug}
      excerpt={excerpt}
      length={length}
      width={width}
      inflatable={inflatable}
      capacity={capacity}
      demo={demo}
      discount={discount}
      cutout={cutout}
      sportSlug={sport.slug}
      brandSlug={brand.slug}

      baseOne={data.baseOne}
      baseTwo={data.baseTwo}
      baseThree={data.baseThree}
      topOne={data.topOne}
      topTwo={data.topTwo}
      topThree={data.topThree}
    />
  );
}

export default Purchase;  