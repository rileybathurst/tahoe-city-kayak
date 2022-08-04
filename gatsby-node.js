const path = require(`path`)

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
}); // makeRequests

// Create blog pages dynamically
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getRetails = makeRequest(graphql, `
    {
      allStrapiRetail {
        edges {
          node {
            slug
            type

            brand {
              slug
            }
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each partner resorts.
    result.data.allStrapiRetail.edges.forEach(({ node }) => {
      createPage({
        path: `/retail/${node.type}/${node.slug}`,
        component: path.resolve(`src/templates/retail.tsx`),
        context: {
          slug: node.slug,
          type: node.type,
          brand: node.brand.slug
        },
      })
    })
  }); // .then(result)

  const getKayaks = makeRequest(graphql, `
    {
      allStrapiBrand(filter: {kayak: {eq: true}}) {
        edges {
          node {
            slug
            retail {
              series
            }
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each partner resorts.
    result.data.allStrapiBrand.edges.forEach(({ node }) => {
      createPage({
        path: `/retail/kayak/${node.slug}`,
        component: path.resolve(`src/templates/kayak-brands.tsx`),
        context: {
          slug: node.slug,
          retail: node.retail.series
        },
      })
    })
  }); // .then(result) */

  const getSups = makeRequest(graphql, `
    {
      allStrapiBrand(filter: {sup: {eq: true}}) {
        edges {
          node {
            slug
            retail {
              series
            }
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each partner resorts.
    result.data.allStrapiBrand.edges.forEach(({ node }) => {
      createPage({
        path: `/retail/sup/${node.slug}`,
        component: path.resolve(`src/templates/sup-brands.tsx`),
        context: {
          slug: node.slug,
          retail: node.retail.series
        },
      })
    })
  }); // .then(result) */

  // Query for blog nodes to use in creating pages.
  return Promise.all([
    getRetails,
    getKayaks,
    getSups
  ])
}