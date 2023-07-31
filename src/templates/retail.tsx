import React from 'react';
import { Link, graphql, Script } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';
import { useSiteUrl } from "../hooks/use-site-url";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Sport from '../components/sport';
import Header from '../components/header';
import Footer from '../components/footer';
import Card from '../components/card';
import Spec from '../components/spec';
import TextureBackgrounds from "../components/texturebackgrounds";
import Danger from "../components/danger";
import Phone from '../components/phone';

function Weight(props) {
  if (props.riggedweight) {
    return (
      <>
        <div className="spec">
          <h2>Hull Weight</h2>
          <h3>
            {props.hullweight}
            <span className="spec__unit">&thinsp;lbs</span>
          </h3>
        </div>
        <div className="spec">
          <h2>Rigged Weight</h2>
          <h3>{props.riggedweight}
            <span className="spec__unit">&thinsp;lbs</span>
          </h3>
        </div>
      </>
    );
  } else {
    return (
      <div className="spec">
        <h2>Hull Weight</h2>
        <h3>
          {props.hullweight}
          <span className="spec__unit">&thinsp;lbs</span>
        </h3>
      </div>
    );
  }
}

function Price(props: { discount: number; price: number; }) {
  // * taken from spec but it was getting too complicated
  if (props.discount) {

    let amount = props.price - (props.discount * (props.price / 100));

    return (
      <>
        {/* // TODO: add color */}
        <div className="spec">
          <h2><del>Original Price</del></h2>
          <h3>
            <del>
              ${props.price}
            </del>
          </h3>
        </div>
        <div className="spec mullen">
          <h2>Sale Price</h2>
          {props.discount}% off
          <h3>${amount}</h3>
        </div>
      </>
    )
  } else {
    return (
      <Spec name="price" spec={props.price} unit="$" unitPlace="before" unitSpace='none' />
    )
  }
}


function ReactMD(props: { raw: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; className: string | undefined; }) {

  // console.log('markdown');
  // console.log(props.raw);

  if (props.raw) {
    if (props.title) {
      return (
        <article className={props.className} itemProp="description" >
          <h3>{props.title}</h3>
          <ReactMarkdown
            children={props.raw}
            remarkPlugins={[remarkGfm]}
          />
        </article>
      );
    } else {
      return <article className={props.className} >
        <ReactMarkdown
          children={props.raw}
          remarkPlugins={[remarkGfm]}
        />
      </article>
    }
  }
  else {
    return null;
  }
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
  } else {
    return null;
  }
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
  } else {
    return null;
  }
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
  } else {
    return null;
  }
}

function Demo(props: { demo: any; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  if (props.demo) {
    return (
      <div className="single__book">
        <h3>Demo</h3>
        <p>If you&rsquo;re looking to try this particular {props.type}, call the shop and request a demo.
          We&rsquo;ll charge you our rental fee*, but we will credit that fee if you decide to purchase a boat or board from us in the same season.
          &#x28;Up to two full days rental charge&#x29;</p>
        {/* // TODO cost may be a single query */}
        <p>* Pedal drive is an additional $5 per rental.</p>
        <p>
          <Phone />
        </p>
      </div>
    );
  } else {
    return null;
  }
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
  else return null;
}

const RetailTypeView = ({ data }) => {

  let cutoutFallback = data.strapiRetail.cutout.alternativeText || 'retail image';

  // ! this still needs work
  if (cutoutFallback.includes('.png')) {
    let cutoutFallback = 'retail image';
  }
  // console.log(cutoutFallback);

  return (
    <>
      <Header />

      {/* // ! I need to close out the title and specs to get them to line up */}
      <main className="retail">
        <div className='passage title'>
          <Link
            to={`/retail/${data.strapiRetail.type}/${data.strapiRetail.brand.slug}`}
            className='link__subtle-svg'
          >
            <Danger svg={data.strapiRetail.brand.svg} />
          </Link>
          <hgroup className="hgroup__retail">
            {/* // TODO: only one h and then p */}

            <h1 className="h_title">{data.strapiRetail.title}</h1>
            <h2 className="h_brand"><Link to={`/retail/${data.strapiRetail.type}/${data.strapiRetail.brand.slug}`}>{data.strapiRetail.brand.name}</Link></h2>

            <Series series={data.strapiRetail.series} />
          </hgroup>
        </div>

        <div className='specs'>
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
            alt={cutoutFallback}
            className="cutout"
            objectFit="contain"
          />
          {/* {data.strapiRetail?.cutout?.alternativeText} */}
        </div>

        <ReactMD
          raw={data.strapiRetail?.features?.data?.features}
          className="features"
          title="Features"
        />

      </main >

      <ReactMD raw={data.strapiRetail.description?.data?.description} className="single__description passage" />

      <Demo demo={data.strapiRetail.demo} type={data.strapiRetail.type} />

      <OtherWrap retail={data.allStrapiRetail} brand={data.strapiRetail.brand.name} slug={data.strapiRetail.brand.slug} type={data.strapiRetail.type}>
        <Other retail={data.allStrapiRetail} />
      </OtherWrap>

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
    </>
  );
};

export default RetailTypeView;

export const Head = ({ data }) => {
  return (
    <SEO
      // can I make the brands capitalize?
      title={`${data.strapiRetail.title} by ${data.strapiRetail.brand.name} | ${useSiteName()}`}
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
              "item": "${useSiteUrl()}/retail"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Retail",
              "item": "${useSiteUrl()}/retail/${data.strapiRetail.type}"
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
