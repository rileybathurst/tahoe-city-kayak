import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { PaddleSEO } from "@rileybathurst/paddle";

type SEOtypes = {
  title?: string,
  description?: string,
  url?: string,
  ogImage?: string,
  ogImageDescription?: string,
  breadcrumbs?: {
    name: string;
    item: string;
  }[],
  children?: React.ReactNode,
};
export const SEO = ({ title, description, ogImage, ogImageDescription, breadcrumbs, children }: SEOtypes) => {

  const data = useStaticQuery(graphql`
    query SEOQuery {
      strapiLocale(slug: {eq: "tahoe-city"}) {
        name
        excerpt
        url
        ogImage
        ogImageDescription
        latitude
        longitude
        geoRadius
        themeColor
        numberOfEmployees
        phone
        email
        paymentAccepted
        priceRange
        slogan

        topbar {
          data {
            topbar
          }
        }
      }

      # location
      strapiLocation(
          name: {eq: "Retail Location"},
          locale: {slug: {eq: "tahoe-city"}}
        ) {
          streetAddress
          addressLocality
          addressRegion
          postalCode
        }

      # departments
      allStrapiLocation(
        filter: {
          name: {in: ["On Water Rental"]},
          locale: {slug: {eq: "tahoe-city"}}
        }
      ) {
        nodes {
          opening_time
          closing_time

          name
          schemaType
          streetAddress
          addressLocality
          addressRegion
          postalCode

          paymentAccepted
        }
      }

    }
  `);

  return (
    <PaddleSEO
      title={title || null}
      description={description || null}
      breadcrumbs={breadcrumbs || null}
      // ogImage={ogImage || null}
      // ogimagedescription={ogImagedescription || null}
      {...data}
    >
      {children}
    </PaddleSEO>
  );
};
