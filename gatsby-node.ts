const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create retail pages dynamically
  const retailageTemplate = path.resolve(`src/templates/retail.tsx`)
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
  retailResult.data.allStrapiRetail.nodes.forEach(retail => {
    createPage({
      path: `/retail/${retail.type}/${retail.slug}`,
      component: retailageTemplate,
      context: {
        slug: retail.slug,
        type: retail.type,
        brand: retail.brand.slug
      },
    })
  })

  // Create Kayak Brands dynamically
  const kayakBrandsTemplate = path.resolve(`src/templates/kayak-brands.tsx`)
  const kayakResult = await graphql(`
    query {
      allStrapiBrand(filter: {kayak: {eq: true}}) {
        nodes {
          slug
          retail {
            series
          }
        }
      }
    }
  `)
  kayakResult.data.allStrapiBrand.nodes.forEach(brand => {
    createPage({
      path: `/retail/kayak/${brand.slug}`,
      component: kayakBrandsTemplate,
      context: {
        slug: brand.slug,
        retail: brand.retail.series,
        type: 'kayak'
      },
    })
  })
  
  // Create SUP Brands dynamically
  const supBrandsTemplate = path.resolve(`src/templates/sup-brands.tsx`)
  const supResult = await graphql(`
    query {
      allStrapiBrand(filter: {sup: {eq: true}}) {
        nodes {
          slug
          retail {
            series
          }
        }
      }
    }
  `)
  supResult.data.allStrapiBrand.nodes.forEach(brand => {
    createPage({
      path: `/retail/sup/${brand.slug}`,
      component: supBrandsTemplate,
      context: {
        slug: brand.slug,
        retail: brand.retail.series,
        type: 'sup'
      },
    })
  })


}