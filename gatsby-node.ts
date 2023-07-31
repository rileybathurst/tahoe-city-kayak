const path = require(`path`);
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create retail pages dynamically
  const retailPageTemplate = path.resolve(`src/templates/retail.tsx`);
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
  `);
  retailResult.data.allStrapiRetail.nodes.forEach(
    (retail: { type: any; slug: any; brand: { slug: any } }) => {
      createPage({
        path: `/retail/${retail.type}/${retail.brand.slug}/${retail.slug}`,
        component: retailPageTemplate,
        context: {
          slug: retail.slug,
          type: retail.type,
          brand: retail.brand.slug,
        },
      });
    }
  );

  const BrandsTemplate = path.resolve(`src/templates/brands.tsx`);
  const brandsResult = await graphql(`
    query {
      allStrapiBrand {
        nodes {
          slug
          retail {
            series
            type
            brand {
              slug
            }
          }
        }
      }
    }
  `);

  const kayakSet = new Set();
  brandsResult.data.allStrapiBrand.nodes.forEach((brand) => {
    // console.log(brand); // 👍🏻
    brand.retail.forEach((retail) => {
      if (retail.type === "kayak") {
        kayakSet.add(retail.brand.slug);
      }
    });
  });

  // this creates the kayak brands
  // console.log(kayakSet);

  kayakSet.forEach((brand) => {
    createPage({
      path: `retail/kayak/${brand}`,
      component: BrandsTemplate,
      context: {
        slug: brand,
        type: "kayak",
      },
    });
  });

  // this creates the sup brands
  const supSet = new Set();
  brandsResult.data.allStrapiBrand.nodes.forEach((brand) => {
    brand.retail.forEach((retail) => {
      if (retail.type === "sup") {
        supSet.add(retail.brand.slug);
      }
    });
  });

  // this creates the kayak brands
  // console.log(supSet);

  supSet.forEach((brand) => {
    createPage({
      path: `/retail/sup/${brand}`,
      component: BrandsTemplate,
      context: {
        slug: brand,
        type: "sup",
      },
    });
  });

  // Create Attributes Dynamically
  // these have to be differnt templates as you can't throw blanks or boths at graphql boolean filters
  const CrewTemplate = path.resolve(`src/templates/crew.tsx`);
  const InflatableTemplate = path.resolve(`src/templates/inflatable.tsx`);
  const WeightTemplate = path.resolve(`src/templates/weight.tsx`);
  const PedalTemplate = path.resolve(`src/templates/pedal.tsx`);

  const attributeResult = await graphql(`
    query {
      allStrapiAttribute {
        nodes {
          slug
          name
          type
        }
      }
    }
  `);

  attributeResult.data.allStrapiAttribute.nodes.forEach(
    (attribute: { slug: string; type: string; name: string }) => {
      if (attribute.slug === "tandem") {
        createPage({
          path: `/retail/attribute/${attribute.type}/${attribute.slug}`,
          component: CrewTemplate,
          context: {
            name: attribute.name,
            type: attribute.type,
            slug: attribute.slug,
          },
        });
      } else if (
        attribute.slug === "inflatable" ||
        attribute.slug === "rigid"
      ) {
        createPage({
          path: `/retail/attribute/${attribute.type}/${attribute.slug}`,
          component: InflatableTemplate,
          context: {
            name: attribute.name,
            type: attribute.type,
            inflatable: attribute.slug === "inflatable" ? true : false,
          },
        });
      } else if (
        attribute.slug === "ultralight" ||
        attribute.slug === "ultralight-tandem"
      ) {
        createPage({
          path: `/retail/attribute/${attribute.type}/${attribute.slug}`,
          component: WeightTemplate,
          context: {
            slug: attribute.slug,
            type: attribute.type,
            weight: attribute.slug === "ultralight" ? 46 : 70,
            crew: attribute.slug === "ultralight" ? "single" : "tandem",
          },
        });
      } else if (attribute.slug === "pedal") {
        // * this is grabbing the whole hobie brand
        createPage({
          path: `/retail/attribute/${attribute.type}/${attribute.slug}`,
          component: PedalTemplate,
          context: {
            slug: attribute.slug,
            type: attribute.type,
          },
        });
      }
    }
  );
};
