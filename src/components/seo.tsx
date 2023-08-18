import React from 'react';
import { Script } from "gatsby";
import { useSiteMetadata } from "../hooks/use-site-metadata"
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

  return (
    <>
      {/* <SEOShowcase test="hey" /> */}
      <title>{seo.title}</title>
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
            "name": "${seo.title}",
            "description": "${seo.description}",
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
            'paymentAccepted': "${paymentAccepted}",
            "telephone": "${telephone}",
            "url": "${url}",
            'numberOfEmployees': "${numberOfEmployees}",
            'slogan': "${slogan}",

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
            }

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