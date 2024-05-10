/*     // TODO: a bunch of this should be in the strapi
    description:
      "North Lake Tahoe's Premier Kayak and Paddleboard Provider offering Rentals, Sales, Lessons and Tours",
    defaultDescription:
      "North Lake Tahoe's Premier Kayak and Paddleboard Provider offering Rentals, Sales, Lessons and Tours",
    defaultImage:
      "https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tahoe_city_kayak-og_image-collage-2.jpg",
    defaultImageAlt: "A collage of images showcasing paddling on Lake Tahoe",
    openingHours: "Mo, Tu, We, Th, Fr, Sa, Su 09:00-18:00",
    telephone: "(530)581-4336",
    email: "tahoecitykayak@gmail.com",
    logo: "/images/icon.png",
    areaServed: "Tahoe City",
    author: "Tahoe City Kayak",
    paymentAccepted: "Cash credit card",
    itemType: "LocalBusiness",
    priceRange: "$50-2500",
    location: {
      address: {
        streetAddress: "521 North Lake Blvd",
        addressLocality: "Tahoe City",
        addressRegion: "CA",
        postalCode: "96145",
      },
    },
    rentalLocation: {
      address: {
        name: "Commons Beach",
        streetAddress: "400 North Lake Blvd",
        addressLocality: "Tahoe City",
        addressRegion: "CA",
        postalCode: "96145",
      },
    },
    geo: {
      latitude: "39.17138171971435",
      longitude: "-120.14098458679503",
      geoRadius: "80470",
    },
    themeColor: "#bf4040",
    numberOfEmployees: "10+",
    slogan:
      "North Tahoes Premier Kayak and Paddleboard Provider of Rentals Sales Lessons and Tours",

    offerCatalog: {
      itemOffered1: "kayak and paddleboard rentals",
      itemOffered2: "kayak and paddleboard sales",
      itemOffered3: "kayak and paddleboard tours and lessons",
    },
    social: {
      facebook: "https://www.facebook.com/pages/Tahoe-City-Kayak/125337723736",
      instagram: "https://www.instagram.com/tahoecitykayak/",
    },
    jobEmail: "tckjobs@gmail.com", */













import React from "react";
import { Script, graphql, useStaticQuery } from "gatsby";
import { useSiteMetadata } from "../hooks/use-site-metadata";
// this throws a VS Code error but is as documented here:
// https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/#create-a-usesitemetadata-hook

import SEOShowcase from "seo-showcase"

interface SEO {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

// add types to the SEO const
export const SEO = (SE0: SEO) => {

  const {
    url,
    defaultDescription,
    defaultImage,
    defaultImageAlt,
    telephone,
    openingHours,
    paymentAccepted,
    location,
    geo,
    themeColor,
    numberOfEmployees,
    slogan,
    offerCatalog
  } = useSiteMetadata()

  const seo = {
    title: SE0.title,
    description: SE0.description || defaultDescription,
    image: SE0.image || defaultImage,
    imageAlt: SE0.imageAlt || defaultImageAlt,
  };

  const { strapiLocale } = useStaticQuery(graphql`
    query SEOQuery {
      strapiLocale(
        slug: { eq: "tahoe-city" }
      ) {
        name
        phone
      }
    }
  `)

  return (
    <>
      {/* <SEOShowcase test="hey" /> */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.imageAlt} />

      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seo.image} />

      <meta name="theme-color" content={themeColor} />

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "LocalBusiness",
            "name": "${strapiLocale.name} Kayak and Paddleboard",
            "description": "${defaultDescription}",
            "image": "${seo.image}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${location.address.streetAddress}",
              "addressLocality": "${location.address.addressLocality}",
              "addressRegion": "${location.address.addressRegion}",
              "postalCode": "${location.address.postalCode}"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "${geo.latitude}",
              "longitude": "${geo.longitude}"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "${geo.latitude}",
                "longitude": "${geo.longitude}"
              },
              "geoRadius": "${geo.geoRadius}"
            },
            "openingHours": "${openingHours}",
            "paymentAccepted": "${paymentAccepted}",
            "telephone": "${strapiLocale.phone}",
            "url": "${url}",
            "numberOfEmployees": "${numberOfEmployees}",

            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "kayak and paddleboard services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "${offerCatalog.itemOffered1}"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "${offerCatalog.itemOffered2}"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "${offerCatalog.itemOffered3}"
                  }
                }
              ]
            },
            
            "slogan": "${slogan}"

          }
        `}
      </Script>
      {SE0.children}
    </>
  );
};

// priceRange
// review
// url