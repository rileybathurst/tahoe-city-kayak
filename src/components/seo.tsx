import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { PaddleSEO } from "@rileybathurst/paddle";

type SEOtypes = {
  title?: string;
  description?: string;
  url?: string;
  og_image?: string;
  og_image_description?: string;
  breadcrumbs?: {
    name: string;
    item?: string;
  }[];
  children?: React.ReactNode;
};
export const SEO = ({
  title,
  description,
  og_image,
  og_image_description,
  breadcrumbs,
  children,
}: SEOtypes) => {
  const data = useStaticQuery(graphql`
    query SEOQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
        excerpt
        url
        og_image
        og_image_description
        latitude
        longitude
        geo_radius
        theme_color
        number_of_employees
        phone
        email
        payment_accepted
        price_range
        slogan

        topbar {
          data {
            topbar
          }
        }
      }

      strapiLocation(
          name: {eq: "Retail Location"},
          branch: {slug: {eq: "tahoe-city"}}
        ) {
          streetAddress
          addressLocality
          addressRegion
          postalCode
        }

      allStrapiLocation(
        filter: {
          name: {in: ["On Water Rental"]},
          branch: {slug: {eq: "tahoe-city"}}
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
    <>
      <html lang="en" />
      {/* // if a page doesnt have this linked it wont pull thge theme as it needs this line */}
      {/* // TODO: write a test to check this is on pages */}
      <body className="tahoe-city" />
      <PaddleSEO
        title={title || null}
        description={description || null}
        breadcrumbs={breadcrumbs || null}
        og_image={og_image || null}
        og_image_description={og_image_description || null}
        {...data}
      >
        {children}
      </PaddleSEO>
    </>
  );
};
