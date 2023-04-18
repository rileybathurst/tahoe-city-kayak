import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Danger from "../../components/danger";
import KayakBrandList from "../../components/kayak-brand-list"
import KayakFeatureList from "../../components/kayak-feature-list";
import Store from "../../components/locations/store";
import More from "../../components/more";
import Retail from "../../content/retail";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Card from "../../components/card";

function OnlyKayak(retail: { retail: { type: string; id?: React.Key; slug?: string; title?: string; excerpt?: string; cutout?: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; }; length?: number; width?: number; capacity?: number; }; }) {

  // console.log(retail);
  // console.log(retail.retail.type);

  if (retail.retail.type === 'kayak') {
    return (
      <Card retail={retail.retail} />
    )
  } else {
    return null;
  }
}

const RetailKayakPage = (data: any) => {

  const query = useStaticQuery(graphql`
query KayaksQuery {
  hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {
    
      nodes {
        id
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
          length
          width
          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
    }
  }

  eddyline: allStrapiBrand(filter: {name: {eq: "eddyline"}}) {
    
      nodes {
      id
      name
      slug
      tagline
      svg

      retail {
        type
        id
        title
        slug
        excerpt
        capacity
        length
        width
        cutout {
          localFile {
            childImageSharp {
              gatsbyImageData
              }
            }
            alternativeText
          }
        }
    }
  }

  perception: allStrapiBrand(filter: {name: {eq: "perception"}}) {
    
      nodes {
        id
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
          length
          width
          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
    }
  }

  wildernesssystems: allStrapiBrand(filter: {name: {eq: "wilderness-systems"}}) {
    
      nodes {
        id
        name
        slug
        tagline
        svg

      retail {
        type
        id
        title
        slug
        excerpt
        capacity
        length
        width
        cutout {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
          }
        }
    }
  }

  delta: allStrapiBrand(filter: {name: {eq: "delta"}}) {
    
      nodes {
        id
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
          length
          width
          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }
  }

  bote: allStrapiBrand(
  filter: {name: {eq: "bote"}, kayak: {eq: true}}
  ) {
    
      nodes {
        id
        name
        slug
        tagline
        svg

        retail {
        type
          id
          title
          slug
          excerpt
          capacity
          length
          width
          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }
  }

  brusurf: allStrapiBrand(filter: {name: {eq: "brusurf"}}) {
    
      nodes {
        id
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
          length
          width
          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }
  }


}
`)

  let hobie = query.hobie;
  let eddyline = query.eddyline;
  let perception = query.perception;
  let wildernesssystems = query.wildernesssystems;
  let delta = query.delta;
  let bote = query.bote;
  let brusurf = query.brusurf;

  let title = "Kayak Retail";
  let parent = "retail";

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <main>
        <div className="location_card-wrapper">
          <div>
            <h1>{title}</h1>
            <Retail />
          </div>

          <div className="location_card">
            <Store />
          </div>
        </div>

        <h2>Browse By Feature</h2>
        <KayakFeatureList />

        <hr />
      </main>

      <section className="passage">
        <h2>Browse By Brand</h2>
      </section>

      <KayakBrandList />

      <div className="brand_blocks">

        {hobie.nodes.map((brand: { id: React.Key | null | undefined; svg: string; slug: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; tagline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; retail: any[]; }) => (
          <div key={brand.id}>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <div className='deck'>
              {brand.retail.slice(0, 4).map((retail: any) => (
                <OnlyKayak
                  retail={retail}
                />
              ))}
            </div>
            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type="kayak"
            />
          </div>
        ))}

        {eddyline.nodes.map((brand: { id: React.Key | null | undefined; svg: string; slug: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; tagline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; retail: any[]; }) => (
          <div key={brand.id}>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <div className='deck'>
              {brand.retail.slice(0, 4).map((retail: any) => (
                <OnlyKayak
                  retail={retail}
                />
              ))}
            </div>

            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type="kayak"
            />
          </div>
        ))}

        {perception.nodes.map((brand: { id: React.Key | null | undefined; svg: string; slug: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; tagline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; retail: any[]; }) => (
          <div key={brand.id}>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <div className='deck'>
              {brand.retail.slice(0, 4).map((retail: any) => (
                <OnlyKayak
                  retail={retail}
                />
              ))}
            </div>

            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type="kayak"
            />
          </div>
        ))}

        {wildernesssystems.nodes.map((brand: { id: React.Key | null | undefined; svg: string; slug: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; tagline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; retail: any[]; }) => (
          <div key={brand.id}>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <div className='deck'>
              {brand.retail.slice(0, 4).map((retail: any) => (
                <OnlyKayak
                  retail={retail}
                />
              ))}
            </div>

            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type="kayak"
            />
          </div>
        ))}

        {delta.nodes.map((brand: { id: React.Key | null | undefined; svg: string; slug: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; tagline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; retail: any[]; }) => (
          <div key={brand.id}>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <div className='deck'>
              {brand.retail.slice(0, 4).map((retail: any) => (
                <OnlyKayak
                  retail={retail}
                />
              ))}
            </div>

            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type="kayak"
            />
          </div>
        ))}


        {bote.nodes.map((brand: { id: React.Key | null | undefined; svg: string; slug: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; tagline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; retail: any[]; }) => (
          <div key={brand.id}>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <div className='deck'>
              {brand.retail.slice(0, 4).map((retail: any) => (
                <OnlyKayak
                  retail={retail}
                />
              ))}
            </div>

            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type="kayak"
            />
          </div>
        ))}

        {brusurf.nodes.map((brand: { id: React.Key | null | undefined; svg: string; slug: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; tagline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; retail: any[]; }) => (
          <div key={brand.id}>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <div className='deck'>
              {brand.retail.slice(0, 4).map((retail: any) => (
                <OnlyKayak
                  retail={retail}
                />
              ))}
            </div>

            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type="kayak"
            />
          </div>
        ))}

      </div>


      <Footer />
    </>
  )
}

export default RetailKayakPage

export const Head = () => {
  return (
    <SEO
      title={`Kayak | ${useSiteName()}`}
      description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."
    >
      <Script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Retail",
            "item": "${useSiteUrl()}/retail"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Kayaks",
          }]
        }
      `}
      </Script>

    </SEO>
  )
}
