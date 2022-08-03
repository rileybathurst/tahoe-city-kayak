import * as React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import Header from "../components/header"
import Footer from "../components/footer"
import Seo from "../components/seo";
import Remainder from "../components/remainder";
import TextureBackgrounds from "../components/texturebackgrounds";

function Spec(props) {
  if (props.name === "Weight") {
    // and if
    if (props.name === "Rigged Weight") {
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
  if (props.raw) {
    if (props.title) {
      return (
        <article className={props.className} itemprop="description" >
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

const RetailView = ({ retail, other }) => {
  return (
    <>
      <Header />

      {/* // TODO test rich results */}
      <Seo
        title={retail.title}
        description={retail.excerpt}
        itemType="https://schema.org/ItemPage"
        itemScope={true}
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        <Link to={`/retail/${retail.type}`}>{retail.type}</Link>&nbsp;/&nbsp;
        <Link to={`/retail/${retail.type}/${retail.brand.name}`}>{retail.brand.name}</Link>&nbsp;/&nbsp;
        &nbsp;{retail.title}
      </div>

      <main className="main__full" itemscope itemtype="https://schema.org/Product">
        <div>
          <hgroup className="hgroup__retail">
            <h1 className="h_title" itemprop="name">{retail.title}</h1>
            <h2 className="h_brand" itemprop="brand">{retail.brand.name}</h2>
            <h3 className="h_series"><Spec name="series" spec={retail.series} /></h3>
          </hgroup>

          <h3>Specs:</h3>
          <Spec name="crew" spec={retail.crew} />
          <Spec name="capacity" spec={retail.capacity} unit="lbs" />
          <Spec name="length" spec={retail.length} unit="&quot;" />

          <Spec
            name="Weight"
            spec={retail.hullweight}
            rigged={retail.riggedweight}
            unit="lbs"
          />

          <Spec name="width" spec={retail.width} unit="&quot;" />
          <Spec name="thickness" spec={retail.thickness} />
          <Spec name="volume" spec={retail.volume} />

          <Spec name="Inflatable" spec={retail.inflatable} />
          <Spec name="demo" spec={retail.demo} />

        </div>
        <div>
          <div className="collage card-collage">
            <TextureBackgrounds />

            <GatsbyImage
              image={retail?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
              alt={retail?.cutout?.alternativeText}
              className="cutout"
            />
          </div>



          <ReactMD
            raw={retail.childStrapiRetailFeaturesTextnode?.features}
            className="features"
            title="Features"
          />
        </div>

      </main>

      <ReactMD raw={retail.childStrapiRetailDescriptionTextnode?.description} className="single__description" />

      {/* <div className="single__book">
        <button>$Buy Now</button>
      </div > */}

      {/* //TODO: this needs far more related */}
      <div className="single__other" >
        <h3>Other Kayaks &amp; SUPs</h3>
        <section className="deck">
          {other.nodes.map(retail => (
            <article className="card">
              <div className="card-collage">
                <TextureBackgrounds />
                <GatsbyImage
                  image={retail?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                  alt={retail?.cutout?.alternativeText}
                  className="cutout"
                  itemprop="image"
                />
              </div>
              <h4 className="card__title">
                <Link to={`/retail/${retail.slug}`}>
                  {retail.title}
                </Link>
              </h4>
              <hr />
              <p>{retail.excerpt}</p>
              <hr />
              <div className="card__details">
                <h4 className="capitalize">{retail.type}</h4>
                <h5><Remainder inches={retail.length} /> tall by {retail.width}" wide</h5>
              </div>
            </article>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RetailView;
