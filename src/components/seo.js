import React from 'react';
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

// ! Based on Sierra Lighting the title template is a default thing
// its not working here yet tho

const SEO = ({
  title,
  description,
  image,
  itemScope,
  itemType,
}) => {
  const { site } = useStaticQuery(query);
  const {
    defaultTitle,
    titleTemplate,
    siteUrl,
    defaultDescription,
    defaultImage,
    // ogImage,
    // twitterImage,
    telephone,
    openingHours,
    areaServed,
    paymentAccepted,
    location,
    themeColor,
    numberOfEmployees,
    slogan,
  } = site.siteMetadata;

  // the double pipe || is or
  // but it doesnt get past the null problem
  // title: `${title} | ${defaultTitle}` || defaultTitle,
  const seo = {
    title: `${title} - Tahoe City Kayak and Paddleboard` || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    ogImage: image,
    // twitterImage: twitterImage,
    url: `${siteUrl}`,
    openingHours: `${openingHours} `,
    telephone: telephone,
    areaServed: areaServed,
    paymentAccepted: paymentAccepted,
    itemScope: itemScope,
    itemType: itemType,
    streetAddress: location.address.streetAddress,
    addressLocality: location.address.addressLocality,
    addressRegion: location.address.addressRegion,
    postalCode: location.address.postalCode,
    themeColor: themeColor,
    numberOfEmployees: numberOfEmployees,
    slogan: slogan,
  };

  return (
    <Helmet
      // title={`${ seo.title } | Tahoe City Kayak`} // this works but needs the if it has something else
      title={seo.title}
      // titleTemplate={titleTemplate}
      // titleTemplate = '%s | Gatsby SEO';
      htmlAttributes={{
        lang: 'en-US',
        itemScope: `${seo.itemScope} `,
        itemType: `${seo.itemType} `,
      }}
    >
      <meta itemProp="name" content={seo.title} />

      <meta name="description" content={seo.description} />
      <meta name="image" itemProp="image" content={seo.ogImage} />
      <meta property="og:type" content="website" />
      {seo.url && <meta property="og:url" itemProp="URL" content={seo.url} />} {/* // ! this isnt there yet */}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" itemProp="image" content={seo.image} />}

      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {seo.openingHours && (
        <meta name="openingHours" itemProp="openingHours" content={seo.openingHours} />
      )}
      {seo.telephone && <meta name="telephone" itemProp="telephone" content={seo.telephone} />}

      {seo.paymentAccepted && (
        <meta name="paymentAccepted" itemProp="paymentAccepted" content={seo.paymentAccepted} />
      )}

      <meta
        name="location" itemProp="address"
        content={
          seo.streetAddress +
          ", " +
          seo.addressLocality +
          ", " +
          seo.addressRegion +
          ", " +
          seo.postalCode
        }
      />

      <meta name="theme-color" content={seo.themeColor} />
      <meta itemProp="numberOfEmployees" content={seo.numberOfEmployees} />
      <meta name="slogan" itemProp="slogan" content={seo.slogan} />

    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
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
  itemType: PropTypes.string,
  themeColor: PropTypes.string,
  numberOfEmployees: PropTypes.string,
};

SEO.defaultProps = {
  lang: `en`,
  itemType: `https://schema.org/LocalBusiness`,
  title: null,
  url: null,
  description: null,
  image: null,
  // ogImage: null,
  // twitterImage: null,
  article: false,
  openingHours: null,
  telephone: null,
  areaServed: null,
  paymentAccepted: null,
  itemScope: false,
  location: null,
  themeColor: null,
  numberOfEmployees: null,
  slogan: null,
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle
        defaultDescription: description
        openingHours
        telephone
        areaServed
        paymentAccepted
        itemType
        location {
          address {
            _type
            addressLocality
            addressRegion
            postalCode
            streetAddress
          }
        }
        defaultImage: image
        themeColor
        numberOfEmployees
        slogan
      }
    }
  }
`;

// url
// defaultImage: image
// ogImage: image
// twitterImage: image