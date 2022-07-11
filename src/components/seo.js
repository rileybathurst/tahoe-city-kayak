import React from 'react';
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({
  title,
  description,
  // image,
  itemScope,
  itemType,
}) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);
  const {
    defaultTitle,
    titleTemplate,
    siteUrl,
    defaultDescription,
    // defaultImage,
    // ogImage,
    // twitterImage,
    telephone,
    openingHours,
    areaServed,
    paymentAccepted,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    // image: `${siteUrl}${image || defaultImage}`,
    // ogImage: image,
    // twitterImage: twitterImage,
    url: `${siteUrl}${pathname}`,
    openingHours: `${openingHours}`,
    telephone: telephone,
    areaServed: areaServed,
    paymentAccepted: paymentAccepted,
    itemScope: itemScope,
    itemType: itemType
  };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={titleTemplate}
      htmlAttributes={{
        lang: 'en-US',
        itemScope: `${seo.itemScope}`,
        itemType: `${seo.itemType}`,
      }}
    >

      {/* Im sure theres a way to do this with a query */}
      <meta itemProp="name" content="Sierra Lighting" />

      <meta name="description" content={seo.description} />
      {/* <meta name="image" itemProp="image" content={seo.ogImage} /> */}
      <meta property="og:type" content="website" />
      {seo.url && <meta property="og:url" itemProp="URL" content={seo.url} />} {/* // ! this isnt there yet */}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {/* {seo.image && <meta property="og:image" itemProp="image" content={seo.ogImage} />} */}

      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      {/* {seo.image && <meta name="twitter:image" content={seo.twitterImage} />} */}

      {seo.openingHours && (
        <meta name="openingHours" itemProp="openingHours" content={seo.openingHours} />
      )}
      {seo.telephone && <meta name="telephone" itemProp="telephone" content={seo.telephone} />}

      {seo.paymentAccepted && (
        <meta name="paymentAccepted" itemProp="paymentAccepted" content={seo.paymentAccepted} />
      )}

    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  // image: PropTypes.string,
  // ogImage: PropTypes.string,
  // twitterImage: PropTypes.string,
  article: PropTypes.bool,
  openingHours: PropTypes.string,
  telephone: PropTypes.string,
  areaServed: PropTypes.string,
  paymentAccepted: PropTypes.string,
  location: PropTypes.string,
  slogan: PropTypes.string,
  gsv: PropTypes.string,
  itemScope: PropTypes.bool,
  itemType: PropTypes.string
};

SEO.defaultProps = {
  lang: `en`,
  itemType: `https://schema.org/LocalBusiness`,
  title: null,
  url: null,
  description: null,
  // image: null,
  // ogImage: null,
  // twitterImage: null,
  article: false,
  openingHours: null,
  telephone: null,
  areaServed: null,
  paymentAccepted: null,
  itemScope: false,
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        openingHours
        telephone
        areaServed
        paymentAccepted
        itemType
      }
    }
  }
`;

// url
// defaultImage: image
// ogImage: image
// twitterImage: image