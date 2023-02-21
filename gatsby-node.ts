const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  const blogPostTemplate = path.resolve(`src/templates/test.tsx`)
  const result = await graphql(`
    query {
      allStrapiBrand {
        nodes {
          slug
        }
      }
    }
  `)
  result.data.allStrapiBrand.nodes.forEach(edge => {
    createPage({
      path: `test/${edge.slug}`,
      component: blogPostTemplate,
      context: {
        slug: edge.slug,
      },
    })
  })

  // 2️⃣
  const retailPostTemplate = path.resolve(`src/templates/retail.tsx`)
  const retailResult = await graphql(`
    query {
      allStrapiRetail {
        nodes {
          slug
          type

          brand {
            slug
          }
        }
      }
    }
  `)
  retailResult.data.allStrapiRetail.nodes.forEach(edge => {
    createPage({
      path: `/retail/${edge.type}/${edge.slug}`,
      component: retailPostTemplate,
      context: {
        slug: edge.slug,
        type: edge.type,
        brand: edge.brand.slug
      },
    })
  })
}