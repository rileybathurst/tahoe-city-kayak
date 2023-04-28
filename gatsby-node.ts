import { inflate } from "zlib"

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


  // Create Attributes Dynamically
  // * but also with if statements to determine which template to use
  // const FeatureTemplate = path.resolve(`src/templates/feature.tsx`)
  
  // ? is this just moving all the complexity or is it helpful?
  // how do we decide that?
  // deep not wide
  // gatsby node is super deep so thats fine to put it here this is the place to be the most complex

  // go out to the view but have a lot coming from template
  // I want the least chance of error or missing data
  // also this is interesting to show how I can source different data

  // having attritutes is super useful as its a better way to query
  // so once I have that then we may as well use it here

  // these have to be differnt templates as you cant throw blanks at graphql filters
  const CrewTemplate = path.resolve(`src/templates/other.tsx`)
  const InflatableTemplate = path.resolve(`src/templates/other.tsx`)

  const attributeResult = await graphql(`
    query {
      allStrapiAttribute {
        nodes {
          name
          type
        }
      }
    }
  `)
  
  attributeResult.data.allStrapiAttribute.nodes.forEach(attribute => {
    if (attribute.name === 'tandem') {
      createPage({
        path: `/retail/${attribute.type}/${attribute.name}`,
        component: CrewTemplate,
        context: {
          name: attribute.name,
          type: attribute.type,
          crew: 'tandem',
        },
      })
    } else if (attribute.name === 'inflatable') {
    createPage({
      path: `/retail/${attribute.type}/${attribute.name}`,
        component: InflatableTemplate,
        context: {
          name: attribute.name,
          type: attribute.type,
          inflatable: true
        }
      })
    } else if (attribute.name === 'rigid') {
    createPage({
      path: `/retail/feature/${attribute.name}`,
        component: InflatableTemplate,
        context: {
          name: attribute.name,
          type: attribute.type,
          inflatable: false
        }
      })
    }
  })

}