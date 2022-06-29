module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }]
};


// localhost strapi API Token
// 4da35f8b1f502aec723481ad404b801fa780459a2512425d949b2ffe84c88c729861ce238695b52ada85c9f14572a9f784ac1a4b70676be9867116025affffcc23ee6081a96aa74cb2b5cd160181fe2e07419ad39632af3acb1b7c443bdcbd750374b2a65eea84eb7b4fef8d65f2a003979d9f23815f5da8eaccaef4edcca389
