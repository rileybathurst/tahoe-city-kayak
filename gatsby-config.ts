require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    "tour",
    "retail",
    "faq",
    "testimonial",
    "brand",
    "imagegrab",
    "attribute",
    "rental-rate",
    "event",
  ],
  singleTypes: [
    "topbar",
    "about",
    "experience",
    "shop", // TODO: update the links
  ],
};

module.exports = {
  graphqlTypegen: true,
  siteMetadata: {
    title: "Tahoe City Kayak and Padddleboard",
    siteUrl: "https://tahoecitykayak.com/", // TODO DO I need both
    url: "https://tahoecitykayak.com", // No trailing slash allowed!
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
      // TODO: I dont think this needs the @type here
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "521 North Lake Blvd",
        addressLocality: "Tahoe City",
        addressRegion: "CA",
        postalCode: "96145",
      },
    },
    rentalLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        name: "Commons Beach",
        streetAddress: "400 North Lake Blvd",
        addressLocality: "Tahoe City",
        addressRegion: "CA",
        postalCode: "96145",
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "39.17138171971435",
      longitude: "-120.14098458679503",
      geoRadius: "80470",
    },
    themeColor: "#bf4040",
    numberOfEmployees: "10+",
    slogan:
      "North Tahoes Premier Kayak and Paddleboard Provider of Rentals Sales Lessons and Tours",

    offerCatalog: {
      "@type": "OfferCatalog",
      itemOffered1: "kayak and paddleboard rentals",
      itemOffered2: "kayak and paddleboard sales",
      itemOffered3: "kayak and paddleboard tours and lessons",
    },
    social: {
      facebook: "https://www.facebook.com/pages/Tahoe-City-Kayak/125337723736",
      instagram: "https://www.instagram.com/tahoecitykayak/",
    },
    jobEmail: "tckjobs@gmail.com",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `jpg`], // adds jpg even if starts as webp
        },
      },
    },

    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },

    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Tahoe City Kayak`,
        short_name: `TCK`,
        start_url: `/`,
        icon: "src/images/favicon.svg", // TODO: something new // theres not quite the right emoji for this
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN, // this is the default
      },
    },
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-G787KQM5VC", // Google Analytics / GA
          "AW-11184788786", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [
            // "/preview/**",
            // "/do-not-track/me/too/"
          ],
          // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
  ],
};
