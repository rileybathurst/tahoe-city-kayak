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
    'imagegrab',
    'attribute'
  ],
  singleTypes: [
    'topbar',
    'about',
    'experience',
    'shop', // TODO: update the links
  ],
};

module.exports = {
  graphqlTypegen: true,
  siteMetadata: {
    title: "Tahoe City Kayak and Padddleboard",
    siteUrl: 'https://tahoe-city-kayak.netlify.app', // TODO DO I need both
    url: 'https://tahoe-city-kayak.netlify.app', // No trailing slash allowed!
    description: "North Lake Tahoe's Premier Kayak and Paddleboard Provider offering Rentals, Sales, Lessons and Tours",
    defaultDescription: "North Lake Tahoe's Premier Kayak and Paddleboard Provider offering Rentals, Sales, Lessons and Tours",
    defaultImage: "https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tahoe_city_kayak-og_image-collage-2.jpg",
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
          formats: [`auto`, `webp`, `jpg`] // adds jpg even if starts as webp
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
        icon: "src/images/favicon.svg", // TODO something new // theres not quite the right emoji for this
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN, // this is the default
      }
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
  ]
};
