import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

const TwoKayakers = (props) => {

  /*  const { strapiImagegrab } = useStaticQuery(graphql`
     query MyQuery {
       strapiImagegrab(title: {eq: "Two Kayakers"}) {
         image {
           localFile {
             childImageSharp {
               gatsbyImageData
             }
           }
         }
       }
     }
   `) */

  return (
    <>
      {/*     <GatsbyImage
        // src="../images/tck-slide-2.webp"
        // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tck-slide-2.jpg"
        image={strapiImagegrab?.image?.localFile?.childImageSharp?.gatsbyImageData}
        alt="two kayakers paddling across lake Tahoe"
        className={`img__wrapped ${props.className}`}
      // breakpoints={[325, 650, 1300]}
      // width={650}
  /> */}
    // todo
    </>
  )
};

export default TwoKayakers;