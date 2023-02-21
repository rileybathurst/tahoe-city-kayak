const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // 1️⃣ Test
  const articlePost = path.resolve("./src/templates/test.tsx")

  const result = await graphql(
    `
      {
        allStrapiBrand {
          nodes {
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Strapi articles`,
      result.errors
    )

    return
  }

  const articles = result.data.allStrapiBrand.nodes

  if (articles.length > 0) {
    articles.forEach((article) => {
      createPage({
        path: `/test/${article.slug}`,
        component: articlePost,
        context: {
          slug: article.slug,
        },
      })
    })
  }


  // 2️⃣ Another do I start here


  const retailPage = path.resolve("./src/templates/retail.tsx")

  const resultRetail = await graphql(
    `
      {
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
    `
  )

  if (resultRetail.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Strapi articles`,
      resultRetail.errors
    )

    return
  }

  const retails = resultRetail.data.allStrapiRetail.nodes

  if (retails.length > 0) {
    retails.forEach((retail) => {
      createPage({
        path: `/retail/${retail.type}/${retail.slug}`,
        component: articlePost,
        context: {
          slug: retail.slug,
          type: retail.type,
          brand: retail.brand.slug
        },
      })
    })
  }





}