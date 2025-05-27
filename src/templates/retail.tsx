import React from 'react';
import { Link, graphql, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";

import Markdown from "react-markdown";
import Sport from '../components/sport';
import Header from '../components/header';
import Footer from '../components/footer';
import Card from '../components/card';
import TextureBackgrounds from "../components/texturebackgrounds";
import Phone from '../components/phone';
// import SEOcase from "../components/seocase"
import type { RetailType } from '../types/retail';

import { Breadcrumb, Breadcrumbs } from 'react-aria-components';
import { PaddleSpecs } from '@rileybathurst/paddle';

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

type RetailTypeViewProps = {
  data: {
    strapiRetail: RetailType;
    allStrapiRetail: {
      nodes: RetailType[];
    };
  };
};
const RetailTypeView = ({ data }: RetailTypeViewProps) => {
  return (
    <>
      <Header />

      {/* // ! I need to close out the title and specs to get them to line up */}
      <main className="retail">
        <div className='title'>
          <Link
            to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}
            className='link__subtle-svg'
          >
            <div
              dangerouslySetInnerHTML={{ __html: data.strapiRetail.brand.svg }}
            />
          </Link>
          <hgroup className="hgroup__retail">
            {/* // TODO: only one h and then p */}

            <h1 className="h_title">{data.strapiRetail.title}</h1>
            <h2 className="h_brand"><Link to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}>{data.strapiRetail.brand.name}</Link></h2>

            <Series series={data.strapiRetail.series} />
          </hgroup>
        </div>

        <section className='specs'>
          <h3>SPECS:</h3>
          {/* TODO: pull the type through */}
          <PaddleSpecs
            crew={data.strapiRetail.crew}
            capacity={data.strapiRetail.capacity}
            length={data.strapiRetail.length}
            width={data.strapiRetail.width}

            weight={{
              hullweight: data.strapiRetail.hullweight,
              riggedweight: data.strapiRetail.riggedweight
            }}

            thickness={data.strapiRetail.thickness}
            // volume={data.strapiRetail.volume}
            inflatable={data.strapiRetail.inflatable}
            demo={data.strapiRetail.demo}

            cost={{
              price: data.strapiRetail.price,
              // discount: data.strapiRetail.discount
            }}
          />
        </section>

        <div className="collage card-collage hero">
          <TextureBackgrounds />

          <GatsbyImage
            image={data.strapiRetail?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={data.strapiRetail?.cutout?.alternativeText || `${data.strapiRetail.title} image`}
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
          <p>If you&rsquo;re looking to try this particular {data.strapiRetail.sport.slug}, call the shop and request a demo.
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

      {/* kayak/kokopelli has only one needs a better */}
      {data.allStrapiRetail ?
        <article>
          <section className='condor'>
            <h2>Other <Sport sport={data.strapiRetail.sport.slug} />s by <span className='capitalize'>{data.strapiRetail.brand.name}</span></h2>
          </section>
          <section className='deck'>
            {data.allStrapiRetail.nodes.map((retail: RetailType) => (
              <Card
                key={retail.id}
                {...retail}
              />
            ))}
          </section>
          <section className='condor'>
            <h3>
              <Link to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}>
                More <Sport sport={data.strapiRetail.sport.slug} />s by <span className='capitalize'>{data.strapiRetail.brand.name}</span>
              </Link>
            </h3>
          </section>
        </article>
        :
        <section className='none'>
          <h3>
            <Link to={`/retail/${data.strapiRetail.sport.slug}`}>
              Browse other <Sport sport={data.strapiRetail.sport.slug} />s
            </Link>
          </h3>
        </section>
      }

      <Breadcrumbs>
        <Breadcrumb><Link to="/retail/">Retail</Link></Breadcrumb>
        <Breadcrumb>
          <Link to={`/retail/${data.strapiRetail.sport.slug}`}>
            <Sport sport={data.strapiRetail.sport.slug} />
          </Link>
        </Breadcrumb>

        <Breadcrumb>
          <Link to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}>
            {data.strapiRetail.brand.name}
          </Link>
        </Breadcrumb>
        <Breadcrumb>{data.strapiRetail.title}</Breadcrumb>
      </Breadcrumbs>


      <Footer />

      {/* <SEOcase
        title={`${data.strapiRetail.title} by ${data.strapiRetail.brand.name}`}
        description={data.strapiRetail.excerpt}
      /> */}
    </>
  );
};

export default RetailTypeView;

type RetailTypeViewHeadProps = {
  data: {
    strapiRetail: RetailType;
  };
};
export const Head = ({ data }: RetailTypeViewHeadProps) => {
  return (
    <SEO
      // TODO: can I make the brands capitalize?
      title={`${data.strapiRetail.title} by ${data.strapiRetail.brand.name}`}
      description={data.strapiRetail.excerpt}
      breadcrumbs={[
        { name: "Retail", item: "retail" },
        { name: data.strapiRetail.sport.slug, item: `retail/${data.strapiRetail.sport.slug}` },
        { name: data.strapiRetail.brand.slug, item: `retail/${data.strapiRetail.brand.slug}` },
        { name: data.strapiRetail.title, item: `retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}` }
      ]}
    >
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
    </SEO>
  )
}

export const query = graphql`
      query (
      $slug: String!,
      $brand: String!
      ) {
        strapiRetail(slug: {eq: $slug}) {
        id
        title
        excerpt
        series
        crew
        capacity
        length
        hullweight
        riggedweight
        width
        thickness
        inflatable
        demo
        price

        sport {
          slug
        }

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
          brand: {slug: {eq: $brand}}
        }
        limit: 2,
        sort: {featured: ASC}
      ) {
        nodes {
        ...retailCard
      }
    }
  }
`;

// discount was removed as currently we dont have it in use so its breaking the build
// volume was removed as currently we dont have it in use so its breaking the build