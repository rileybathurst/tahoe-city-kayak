// TODO add the retail content

import React from 'react';
import { Link, graphql, StaticQuery, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import Header from '../components/header';
import Footer from '../components/footer';

import Remainder from "../components/remainder";
import TextureBackgrounds from "../components/texturebackgrounds";


function Spec(props) {
  if (props.name === 'length' || props.name === 'width') {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3><Remainder inches={props.spec} /></h3>
      </div>
    );
  } else if (props.name === "Weight") {
    // and if
    if (props.name === "Weight") {
      return (
        <>
          <div className="spec">
            <h2>Hull Weight</h2>
            <h3>
              {props.spec}
              <span className="spec__unit">&thinsp;{props.unit}</span>
            </h3>
          </div>
          <div className="spec">
            <h2>Rigged Weight</h2>
            <h3>{props.rigged}
              <span className="spec__unit">&thinsp;{props.unit}</span>
            </h3>
          </div>
        </>
      );
    } else {
      return (
        <div className="spec">
          <h2>{props.name}</h2>
          <h3>
            {props.spec}
            <span className="spec__unit">&thinsp;{props.unit}</span>
          </h3>
        </div>
      );
    }
  } else if (props.spec === true) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3>Yes</h3>
      </div>
    );
  } else if (props.spec) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3>
          {props.spec}
          <span className="spec__unit">&thinsp;{props.unit}</span>
        </h3>
      </div>
    );
  } else {
    return null;
  }
}

function ReactMD(props) {

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

function Other(props) {

  // console.log('test');

  if (props.retail) {
    return (
      <article className="card">
        <div className="card-collage">
          <TextureBackgrounds />
          <GatsbyImage
            image={props.retail?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={props.retail?.cutout?.alternativeText}
            className="cutout"
            itemProp="image"
          />
        </div>
        <h4 className="card__title">
          <Link to={`/retail/${props.retail.type}/${props.retail.slug}`}>
            {props.retail.title}
          </Link>
        </h4>
        <hr />
        <p>{props.retail.excerpt}</p>
        <hr />
        <div className="card__details">
          {/* // TODO: change this to capcity */}
          <h4 className="capitalize">{props.retail.type}</h4>
          <h5><Remainder inches={props.retail.length} /> tall by {props.retail.width}" wide</h5>
        </div>
      </article>
    )
  } else {
    return null;
  }
}

function OtherWrap(props) {
  if (props.retail.edges.length !== 0) {
    return (
      <>
        <section className=''>
          <h2>Other {props.type}s by <span className='capitalize'>{props.brand}</span></h2>
        </section>
        <div className='deck'>
          {props.children}
        </div>
        <section>
          <h3>
            <Link to={`/retail/${props.type}/${props.slug}`}>
              More {props.type}s by <span className='capitalize'>{props.brand}</span>
            </Link>
          </h3>
        </section>
      </>
    )
  } else {
    return null;
  }
}

// references that there are no other by brand
function None(props) {
  // console.log(props.retail.edges);

  if (props.retail.edges.length === 0) {
    return (
      <section className='none'>
        <h3>
          <Link to={`/retail/${props.type}`}>
            Browse other {props.type}s
          </Link>
        </h3>
      </section>
    )
  } else {
    return null;
  }
}

function Demo(props) {
  if (props.demo) {
    return (
      <div className="single__book">
        <h3>Demo</h3>
        <p>If you&rsquo;re looking to try this particular {props.type}, call the shop and request a demo.
          We&rsquo;ll charge you our rental fee*, but we will credit that fee if you decide to purchase a boat or board from us in the same season.
          &#x28;Up to two full days rental charge&#x29;</p>
        {/* // TODO: this can be by a boolean */}
        {/* // TODO cost may be a single query */}
        <p>* Pedal drive is an additional $5 per rental.</p>
        <p>Phone:&nbsp;
          <a href="phone:(530) 581-4336" rel="norel norefferer" className="book-now">
            (530) 581-4336
          </a>
        </p>
      </div>
    );
  } else {
    return null;
  }
}

const RetailTypeView = ({ data }) => {
  return (
    <>
      <Header />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/retail" itemProp="item">
            <span itemProp="name">Retail</span>
            <meta itemProp="position" content="2" />
          </Link>&nbsp;/&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to={`/retail/${data.strapiRetail.type}`} itemProp="item">
            <span itemProp="name">{data.strapiRetail.type}</span>
            <meta itemProp="position" content="3" />
          </Link>&nbsp;/&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {data.strapiRetail.title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main className="main__full" itemScope itemType="https://schema.org/Product">
        <div>
          <hgroup className="hgroup__retail">
            <h1 className="h_title" itemProp="name">{data.strapiRetail.title}</h1>
            <h2 className="h_brand" itemProp="brand">{data.strapiRetail.brand.name}</h2>
            <h3 className="h_series"><Spec name="series" spec={data.strapiRetail.series} /></h3>
          </hgroup>

          <h3>Specs:</h3>
          <Spec name="crew" spec={data.strapiRetail.crew} />
          <Spec name="capacity" spec={data.strapiRetail.capacity} unit="lbs" />
          <Spec name="length" spec={data.strapiRetail.length} unit="&quot;" />
          <Spec name="width" spec={data.strapiRetail.width} unit="&quot;" />

          <Spec
            name="Weight"
            spec={data.strapiRetail.hullweight}
            rigged={data.strapiRetail.riggedweight}
            unit="lbs"
          />

          <Spec name="thickness" spec={data.strapiRetail.thickness} />
          <Spec name="volume" spec={data.strapiRetail.volume} />

          <Spec name="Inflatable" spec={data.strapiRetail.inflatable} />
          {/* <Spec name="demo" spec={data.strapiRetail.demo} /> */}
        </div>
        <div>
          <div className="collage card-collage">
            <TextureBackgrounds />

            <GatsbyImage
              image={data.strapiRetail?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
              alt={data.strapiRetail?.cutout?.alternativeText}
              className="cutout"
            />
          </div>

          <ReactMD
            raw={data.strapiRetail.childStrapiRetailFeaturesTextnode?.features}
            className="features"
            title="Features"
          />
        </div>
      </main>

      <ReactMD raw={data.strapiRetail.childStrapiRetailDescriptionTextnode?.description} className="single__description" />

      <Demo demo={data.strapiRetail.demo} type={data.strapiRetail.type} />

      <OtherWrap retail={data.allStrapiRetail} brand={data.strapiRetail.brand.name} slug={data.strapiRetail.brand.slug} type={data.strapiRetail.type}>
        {data.allStrapiRetail.edges.map(({ node }) => (
          <Other retail={node} />
        ))}
      </OtherWrap>

      {/* // The map just creates nothing so I cant go that way */}
      {/* // It's a pretty rare case so I dont actually query a set of cards */}
      <None retail={data.allStrapiRetail} type={data.strapiRetail.type} />

      <Footer />
    </>
  );
};

export default RetailTypeView;

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.strapiRetail.title} by ${data.strapiRetail.brand.name} sold at ${TitleTemplate}`}
      description={data.strapiRetail.excerpt}>

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": ${data.strapiRetail.title},
            "description": ${data.strapiRetail.excerpt},
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "USD"
            },
          }
      `}
      </Script>

    </SEO>
  )
}

export const query = graphql`
  query RetailTemplate(
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

      brand {
        name
        slug
      }

      childStrapiRetailDescriptionTextnode {
        description
      }

      childStrapiRetailFeaturesTextnode {
        features
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
      limit: 2
    ) {
      edges {
        node {
          id
          title
          slug
          excerpt
          width
          length
          type

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
`;
