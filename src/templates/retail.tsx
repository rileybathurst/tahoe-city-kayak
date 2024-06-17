import React from 'react';
import { Link, graphql, Script } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';

import Markdown from "react-markdown";
import Sport from '../components/sport';
import Header from '../components/header';
import Footer from '../components/footer';
import Card from '../components/card';
import Spec from '../components/spec';
import TextureBackgrounds from "../components/texturebackgrounds";
import Phone from '../components/phone';

import SEOcase from "../components/seocase"
import Remainder from '../components/remainder';

// ? I dont need generic but maybe I do if I dont know what Im getting from a spread?
//  might be more of a package problem
interface Spec2Types {
  crew: string;
  capacity: number;
}
function Spec2({ crew, capacity }: Spec2Types) {
  return (
    Object.entries({ crew, capacity }).map(([key, value]) => {
      return (
        <section key={key}>
          <h3>{key} - {value}</h3>
        </section>
      )
    })
  )
}

// ! this is where it gets interesting
// ? maybe needs to be a generic here
// I might get passes a string or an object
// if I dont know what I'm getting I can't do the capacity test
// then I need

// * this list is going to get long hence generics
// it also has tour types or almost everything is not used each time

interface Spec3Types {
  crew: string;
  capacity: {
    data: number;
    unit: string;
  };
  test: {
    data: string;
    unit: string;
  };
  length: {
    data: number;
    unit: string;
  };
}
function Spec3({ crew, capacity, test, length }: Spec3Types) {

  console.log(crew);
  console.log(capacity);

  return (
    Object.entries({ crew, capacity, test, length }).map(([key, value]) => {

      // console.log(value);
      // this is maybe where you can use generics to get around this check

      // or if the next capacity data is a string
      // so you create a string here from the object

      if (typeof value !== 'string' && key && value) {

        // * works but cant be type safe
        // ? i guess you could wrap it in a typeof check
        // so this is getting kinda ugly
        if (key === 'length' && typeof value.data === 'number') {
          return (
            <section key={key}>
              <h3>{key} - <Remainder inches={value.data} /></h3>
            </section>
          )
        }

        const combinedDataUnit = `${value.data} ${value.unit}`;
        return (
          <section key={key}>
            <h3>{key} - {combinedDataUnit}</h3>
          </section>
        )
      }

      if (key && value) {
        return (
          <section key={key}>
            <h3>{key} - {value}</h3>
          </section>
        )
      }

      return (
        <section key={key}>
          <h3>{key}</h3>
        </section>
      );

    })
  )
}

// ? I dont need generic but maybe I do if I dont know what Im getting from a spread?
//  might be more of a package problem
/* function Spec4<ElementType>({ crew, capacity }: ElementType) {
  const values = Object.values({ crew, capacity });
} */


type WeightTypes = {
  riggedweight: number;
  hullweight: number;
}
function Weight({ riggedweight, hullweight }: WeightTypes) {
  return (
    <>
      <div className="spec">
        <h2>Hull Weight</h2>
        <h3>
          {hullweight}
          <span className="spec__unit">&thinsp;lbs</span>
        </h3>
      </div>
      {riggedweight ?
        <div className="spec">
          <h2>Rigged Weight</h2>
          <h3>{riggedweight}
            <span className="spec__unit">&thinsp;lbs</span>
          </h3>
        </div>
        : null
      }
    </>
  );
}

interface PriceTypes {
  price: number;
  discount: number;
}
function Price({ price, discount }: PriceTypes) {
  if (discount) {

    const amount = price - (discount * (price / 100));

    return (
      <>
        {/* // TODO: add color */}
        <div className="spec">
          <h2><del>Original Price</del></h2>
          <h3>
            <del>
              ${price}
            </del>
          </h3>
        </div>
        <div className="spec mullen">
          <h2>Sale Price</h2>
          {discount}% off
          <h3>${amount}</h3>
        </div>
      </>
    )
  }
  return (
    <Spec name="price" spec={price} unit="$" unitPlace="before" unitSpace='none' />
  )
}

function Other(props: { retail: { nodes: any[]; }; }) {
  if (props.retail) {
    return (
      <section className='deck'>
        {props.retail.nodes.map((retail: { id: any; type?: string; brand?: { slug: string; }; slug?: string; title?: string; excerpt?: string; cutout?: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; }; length?: number; width?: number; capacity?: number; inflatable?: boolean | undefined; demo?: boolean | undefined; }) => (
          <div key={retail.id}>
            <Card retail={retail} />
          </div>
        ))}
      </section>
    )
  }
  return null;
}

function OtherWrap(props: { retail: { nodes: string | any[]; }; type: string; brand: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; slug: any; }) {
  if (props.retail.nodes.length !== 0) {
    return (
      <article>
        <section className='passage'>
          <h2>Other <Sport sport={props.type} />s by <span className='capitalize'>{props.brand}</span></h2>
        </section>
        {props.children}
        <section className='passage'>
          <h3>
            <Link to={`/retail/${props.type}/${props.slug}`}>
              More <Sport sport={props.type} />s by <span className='capitalize'>{props.brand}</span>
            </Link>
          </h3>
        </section>
      </article>
    )
  }
  return null;
}

// references that there are no other by brand
function None(props: { retail: { nodes: string | any[]; }; type: string; }) {
  // console.log(props.retail.edges);

  if (props.retail.nodes.length === 0) {
    return (
      <section className='none'>
        <h3>
          <Link to={`/retail/${props.type}`}>
            Browse other <Sport sport={props.type} />s
          </Link>
        </h3>
      </section>
    )
  }

  return null;
}

function Series(props: { series: string; }) {
  if (props.series) {
    return (
      <div className='h_series'>
        <div className='spec'>
          <h2>
            Series
          </h2>
          <h3>
            {props.series}
          </h3>
        </div>
      </div>
    );
  }
  return null;
}

const RetailTypeView = ({ data }) => {
  return (
    <>
      <Header />

      {/* // ! I need to close out the title and specs to get them to line up */}
      <main className="retail">
        <div className='title'>
          <Link
            to={`/retail/${data.strapiRetail.type}/${data.strapiRetail.brand.slug}`}
            className='link__subtle-svg'
          >
            <div
              dangerouslySetInnerHTML={{ __html: data.strapiRetail.brand.svg }}
            />
          </Link>
          <hgroup className="hgroup__retail">
            {/* // TODO: only one h and then p */}

            <h1 className="h_title">{data.strapiRetail.title}</h1>
            <h2 className="h_brand"><Link to={`/retail/${data.strapiRetail.type}/${data.strapiRetail.brand.slug}`}>{data.strapiRetail.brand.name}</Link></h2>

            <Series series={data.strapiRetail.series} />
          </hgroup>
        </div>

        <div className='specs'>

          {/* // ! testing ideas */}
          {/*           <Spec2
            crew={data.strapiRetail.crew}
            capacity={data.strapiRetail.capacity}
          /> */}
          {/* // ! take this into production */}

          {/*           {data.strapiRetail.crew && data.strapiRetail.capacity ?
            <Spec3
              crew={data.strapiRetail.crew}
              capacity={{ data: data.strapiRetail.capacity, unit: "lbs" }}
            />
            : null} */}

          {/* // ! testing ideas */}
          {/* // * this one went too far I couldnt get there */}
          {/*           <Spec4
            crew={data.strapiRetail.crew}
            capacity={{ data: data.strapiRetail.capacity, unit: "lbs" }}
          /> */}

          <h3>SPECS:</h3>
          <Spec name="crew" spec={data.strapiRetail.crew} />
          <Spec name="capacity" spec={data.strapiRetail.capacity} unit="lbs" />
          <Spec name="length" spec={data.strapiRetail.length} unit="&quot;" />
          <Spec name="width" spec={data.strapiRetail.width} unit="&quot;" />

          <Weight
            hullweight={data.strapiRetail.hullweight}
            riggedweight={data.strapiRetail.riggedweight}
          />

          {/* // TODO: needs units */}
          <Spec name="thickness" spec={data.strapiRetail.thickness} />
          <Spec name="volume" spec={data.strapiRetail.volume} />

          <Spec name="Inflatable" spec={data.strapiRetail.inflatable} />
          {/* <Spec name="demo" spec={data.strapiRetail.demo} /> */}

          <Price price={data.strapiRetail.price} discount={data.strapiRetail.discount} />
        </div>

        <div className="collage card-collage hero">
          <TextureBackgrounds />

          <GatsbyImage
            image={data.strapiRetail?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={data.strapiRetail.cutout.alternativeText || 'retail image'}
            className="cutout"
            objectFit="contain"
          />
          {/* {data.strapiRetail?.cutout?.alternativeText} */}
        </div>

        {/* // TODO: if no features move the description up */}
        {data.strapiRetail.features ?
          <>
            <h3>Features</h3>
            <Markdown className='react-markdown features'>
              {data.strapiRetail.features.data.features}
            </Markdown>
          </>
          : null
        }

      </main >

      {/* // TODO: ifthe description moved up dont run it here */}
      <Markdown className='react-markdown condor'>
        {data.strapiRetail.description?.data?.description}
      </Markdown>

      {/* // TODO: description to strapi */}
      {/* // TODO: pedal drive should be a query */}
      {data.strapiRetail.demo ?
        <div className="single__book">
          <h3>Demo</h3>
          <p>If you&rsquo;re looking to try this particular {data.strapiRetail.type}, call the shop and request a demo.
            We&rsquo;ll charge you our rental fee*, but we will credit that fee if you decide to purchase a boat or board from us in the same season.
            &#x28;Up to two full days rental charge&#x29;</p>
          {/* // TODO cost may be a single query */}
          <p>* Pedal drive is an additional $5 per rental.</p>
          <p>
            <Phone />
          </p>
        </div>
        : null
      }

      {data.allStrapiRetail ?
        <article>
          <section className='condor'>
            <h2>Other <Sport sport={data.strapiRetail.type} />s by <span className='capitalize'>{data.strapiRetail.brand.name}</span></h2>
          </section>
          <Other retail={data.allStrapiRetail} />
          <section className='condor'>
            <h3>
              <Link to={`/retail/${data.strapiRetail.type}/${data.strapiRetail.brand.slug}`}>
                More <Sport sport={data.strapiRetail.type} />s by <span className='capitalize'>{data.strapiRetail.brand.name}</span>
              </Link>
            </h3>
          </section>
        </article>
        : null
      }

      {/* // The map just creates nothing so I cant go that way */}
      {/* // It's a pretty rare case so I dont actually query a set of cards */}
      <None retail={data.allStrapiRetail} type={data.strapiRetail.type} />
      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
          </li>

          <li>
            <Link to={`/retail/${data.strapiRetail.type}`}><Sport sport={data.strapiRetail.type} /></Link>&nbsp;/&nbsp;
          </li>

          <li aria-current="page">{data.strapiRetail.title}</li>
        </ol>
      </nav>
      <Footer />

      <SEOcase
        title={`${data.strapiRetail.title} by ${data.strapiRetail.brand.name} | ${useSiteMetadata().title}`}
        description={data.strapiRetail.excerpt}
      />
    </>
  );
};

export default RetailTypeView;

export const Head = ({ data }) => {
  return (
    <SEO
      // TODO: can I make the brands capitalize?
      title={`${data.strapiRetail.title} by ${data.strapiRetail.brand.name} | ${useSiteMetadata().title}`}
      description={data.strapiRetail.excerpt}>

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${data.strapiRetail.title}",
            "description": "${data.strapiRetail.excerpt}",
            "brand": {
              "@type": "Brand",
              "name": "${data.strapiRetail.brand.name}"
            },
            "image": "${data.strapiRetail?.cutout?.alternativeText}",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "USD",
              "price": "${data.strapiRetail.price}"
            }
          }
        `}
      </Script>
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Retail",
              "item": "${useSiteMetadata().url}/retail"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Retail",
              "item": "${useSiteMetadata().url}/retail/${data.strapiRetail.type}"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "${data.strapiRetail.title}"
            }]
          }
      `}
      </Script>

    </SEO>
  )
}

export const query = graphql`
  query (
    $slug: String!,
    $type: String!,
    $brand: String!
  ) {
    strapiRetail(slug: {eq: $slug}) {
      id
      title
      type
      excerpt
      series
      crew
      capacity
      length
      hullweight
      riggedweight
      width
      thickness
      volume
      inflatable
      demo
      price
      discount

      brand {
        name
        slug
        svg
      }

      description {
        data {
          description
        }
      }

      features {
        data {
          features
        }
      }

      cutout {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

    allStrapiRetail(filter:
      {
        slug: {ne: $slug},
        type: {eq: $type},
        brand: {slug: {eq: $brand}}
      }
      limit: 2,
      sort: {featured: ASC}
    ) {
      nodes {
        id
        title
        slug
        excerpt
        width
        length
        type
        capacity
        hullweight
        brand {
          slug
        }

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
`;
