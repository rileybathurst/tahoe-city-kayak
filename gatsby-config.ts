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
    'brand'
  ],
  singleTypes: [],
};

module.exports = {
  siteMetadata: {
    title: "Tahoe City Kayak and Padddleboard",
    defaultTitle: "Tahoe City Kayak and Padddleboard",
    siteUrl: 'https://tahoe-city-kayak.netlify.app',
    url: 'https://tahoe-city-kayak.netlify.app', // No trailing slash allowed!
    description: "North Lake Tahoe's Premier Kayak and Paddleboard Provider offering Rentals, Sales, Lessons and Tours",
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
    image: "https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tahoe_city_kayak-og_image-collage.jpg",
    themeColor: '#bf4040',
    numberOfEmployees: '10+',
    slogan: 'North Tahoes Premier Kayak and Paddleboard Provider of Rentals Sales Lessons and Tours',

    TitleTemplate: '%s | Gatsby SEO',

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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`, // ? I think this is where I need to stop the npm start errors and this might be doing that but I dont know if its actually helping
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
        icon: "src/images/favicon.svg",
      },
    },
  ]
};