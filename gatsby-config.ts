require("dotenv").config({
  path: ".env",
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    "announcement",
    "attribute",
    "brand",
    "condition",
    "event",
    "faq",
    "imagegrab",
    "job",
    "locale",
    "location",
    "moonlight-tour-date-time",
    "policy",
    "rental-addon",
    "rental-rate",
    "retail",
    "sunset-tour-time",
    "team",
    "testimonial",
    "tour",
    "weather-day",
  ],
  singleTypes: [
    "about",
    "experience",
    "demo",
    "protect",
    "rental",
    "river",
    "shop", // TODO: update the links
    "invasive",
  ],
  remoteFileHeaders: {
    Referer: process.env.STRAPI_API_URL,
  },
};

module.exports = {
  graphqlTypegen: true,
  siteMetadata: {
    title: "Tahoe City Kayak and Padddleboard",
    siteUrl: "https://tahoecitykayak.com/", // TODO DO I need both
    url: "https://tahoecitykayak.com", // No trailing slash allowed!
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-csp",
      options: {
        mergeSecurityHeaders: true, // ? testing may 2024 csp issue
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          "script-src":
            "'self' 'unsafe-inline' www.google-analytics.com googletagmanager.com book.peek.com book12.freetls.fastly.net use.typekit.net",
          "frame-src": "'self' book.peek.com",
          "style-src":
            "'self' 'unsafe-inline' book12.freetls.fastly.net localhost:8000",
          "font-src": "'self' data: 'unsafe-inline' use.typekit.net",
          "img-src": "'self' google-analytics.com data: about:", // ? I think  is a tracking pixel
          "connect-src": "'self' data: google-analytics.com sentry.io",
          "media-src": "'self' data:",
        },
      },
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: ["auto", "webp", "jpg"], // adds jpg even if starts as webp
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-strapi",
      options: strapiConfig,
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require("postcss-import"),
          require("autoprefixer"),
          require("postcss-nested"),
        ],
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
        name: "Tahoe City Kayak",
        short_name: "TCK",
        start_url: "/",
        // TODO: something new // theres not quite the right emoji for this
        icon: "src/images/favicon.svg",
      },
    },
    /*     {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    }, */
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN, // this is the default
      },
    },
    "gatsby-plugin-smoothscroll",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true, // defaults to false
        jsxPragma: "jsx", // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
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
