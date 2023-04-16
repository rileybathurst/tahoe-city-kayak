import React from 'react';
import { Script } from "gatsby";
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { title } from 'process';
// this throws an error but is as documented here:
// https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/#create-a-usesitemetadata-hook

interface SEO {
  title: string;
  // id: number;
}

// add types to the SEO const
export const SEO = ({
  title,
  description,
  image,
  children
}) => {

  const {
    url,
    siteUrl,
    defaultDescription,
    defaultImage,
    telephone,
    openingHours,
    areaServed,
    paymentAccepted,
    location,
    geo,
    themeColor,
    numberOfEmployees,
    slogan,
    offerCatalog
  } = useSiteMetadata()

  const seo = {
    title: title,
    description: description || defaultDescription,
    image: image || defaultImage,
    ogImage: image,
    url: `${siteUrl}`,
    openingHours: `${openingHours} `,
    telephone: telephone,
    areaServed: areaServed,
    paymentAccepted: paymentAccepted,
    streetAddress: location.address.streetAddress,
    addressLocality: location.address.addressLocality,
    addressRegion: location.address.addressRegion,
    postalCode: location.address.postalCode,
    themeColor: themeColor,
    numberOfEmployees: numberOfEmployees,
    slogan: slogan,
  };

  console.log("seo", seo)

  return (
    <>
      <title>{seo.title}</title>

      {/* <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🛶</text></svg>" /> */}

      {seo.image}

      <meta name="description" content={seo.description} />
      <meta name="image" itemProp="image" content={seo.image} />
      <meta property="og:type" content="website" />
      {seo.url && <meta property="og:url" itemProp="URL" content={seo.url} />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" itemProp="image" content={seo.image} />}

      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {seo.openingHours && (
        <meta name="openingHours" itemProp="openingHours" content={seo.openingHours} />
      )}
      {seo.telephone && <meta name="telephone" itemProp="telephone" content={seo.telephone} />}

      {seo.paymentAccepted && (
        <meta name="paymentAccepted" itemProp="paymentAccepted" content={seo.paymentAccepted} />
      )}

      <meta
        name="location" itemProp="address"
        content={
          seo.streetAddress +
          ", " +
          seo.addressLocality +
          ", " +
          seo.addressRegion +
          ", " +
          seo.postalCode
        }
      />

      <meta name="theme-color" content={seo.themeColor} />
      <meta itemProp="numberOfEmployees" content={seo.numberOfEmployees} />
      <meta name="slogan" itemProp="slogan" content={seo.slogan} />

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "LocalBusiness",
            "name": "${title}",
            "description": "${description}",
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
            "telephone": "${telephone}",
            "url": "${url}",

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
      {children}
    </>
  );
};

// TODO: // Later Recommended properties
// priceRange
// review
// url