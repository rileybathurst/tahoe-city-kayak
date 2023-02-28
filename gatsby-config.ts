require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    'tour',
    'retail',
    'faq',
    'testimonial',
    'brand',
    'imagegrab'
  ],
  singleTypes: [
    'topbar'
  ],
};

module.exports = {
  siteMetadata: {
    title: "Tahoe City Kayak and Padddleboard",
    name: "Tahoe City Kayak and Padddleboard",
    defaultTitle: "Tahoe City Kayak and Padddleboard", // TODO I dont need this 3 times
    siteUrl: 'https://tahoe-city-kayak.netlify.app',
    url: 'https://tahoe-city-kayak.netlify.app', // No trailing slash allowed!
    description: "North Lake Tahoe's Premier Kayak and Paddleboard Provider offering Rentals, Sales, Lessons and Tours",
    defaultDescription: "North Lake Tahoe's Premier Kayak and Paddleboard Provider offering Rentals, Sales, Lessons and Tours",
    openingHours: 'Mo, Tu, We, Th, Fr, Sa, Su 09:00-18:00',
    telephone: '(530) 581-4336',
    email: 'tahoecitykayak@gmail.com',
    logo: '/images/icon.png',
    areaServed: 'Tahoe City',
    author: 'Tahoe City Kayak',
    paymentAccepted: 'Cash credit card',
    itemType: 'LocalBusiness',
    priceRange: '$50-2500',
    location: {
      '@type': 'Place',
      'address': {
        "@type": "PostalAddress",
        "streetAddress": "521 North Lake Blvd",
        "addressLocality": "Tahoe City",
        "addressRegion": "CA",
        "postalCode": "96145",
      }
    },
    geo: {
      '@type': 'GeoCoordinates',
      'latitude': '39.17138171971435',
      'longitude': '-120.14098458679503',
      'geoRadius': '80470',
    },
    image: "https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tahoe_city_kayak-og_image-collage.jpg",
    themeColor: '#bf4040',
    numberOfEmployees: '10+',
    slogan: 'North Tahoes Premier Kayak and Paddleboard Provider of Rentals Sales Lessons and Tours',

    offerCatalog: {
      '@type': 'OfferCatalog',
      'itemOffered1': 'kayak and paddleboard rentals',
      'itemOffered2': 'kayak and paddleboard sales',
      'itemOffered3': 'kayak and paddleboard tours and lessons'
    }

  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `jpg`]
        },
      },
    },


    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",

    // Nodes can only be updated by their owner. Node "7dea09dc-1639-5d5d-9dd1-03947e6650bc" is
    // owned by "gatsby-source-filesystem" and another plugin "gatsby-plugin-image"
    // tried to update it.

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
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
        icon: "src/images/favicon.svg", // TODO something new // theres not quite the right emoji for this
      },
    },
  ]
};
