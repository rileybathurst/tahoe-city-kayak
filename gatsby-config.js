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
    'testimonial'
  ],
  singleTypes: [],
};

module.exports = {
  siteMetadata: {
    title: "Tahoe City Kayak",
    siteUrl: 'https://tahoe-city-kayak.netlify.app',
    url: 'https://tahoe-city-kayak.netlify.app', // No trailing slash allowed!
    description: "North Tahoes Premier Kayak and SUP Provider of Rentals Sales Lessons and Tours",
    openingHours: 'Mo, Tu, We, Th, Fr, Sa, Su 09:00-18:00',
    telephone: '(530) 581-4336',
    email: 'tahoecitykayak@gmail.com',
    logo: '/images/icon.png',
    areaServed: 'tahoe city',
    author: 'Tahoe City Kayak',
    paymentAccepted: 'Cash check credit card',
    itemType: 'LocalBusiness',
    priceRange: '$50-2500',
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
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
  ]
};
