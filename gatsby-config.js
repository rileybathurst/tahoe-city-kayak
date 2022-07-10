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
    siteUrl: `https://tahoe-city-kayak.netlify.app`
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    /* {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `jpg`, `png`], // `webp`
        }
      }
    }, */
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",
    // "gatsby-plugin-mdx",
    // "gatsby-source-filesystem",
    /* {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, */
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
    },]
};
