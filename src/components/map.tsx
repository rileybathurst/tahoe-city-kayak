import React from 'react';
import { Script } from "gatsby";
import { useStrapiMap } from "../hooks/use-strapi-map"

// ? or map somewhere here

export const StrapiMap = () => {
  const {
    nodes
  } = useStrapiMap()

  // this throws out the array
  console.log(useStrapiMap());
  // this gets the first answer
  console.log(useStrapiMap()[0].answer);



  return (
    <>
      {/* this is allowed */}
      {/* <meta name='check' content={useStrapiMap()[0].answer} /> */}

      {/* now were getting close */}
      {/*       {useStrapiMap().map((item) => (
        <>
          <meta name='tess' content={item.answer} />
        </>
      ))} */}

      {/* this technically works but each one is a single input which isnt good but i think the build out is slightly different? */}
      ${useStrapiMap().map((item) => (
        <Script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
              "question": "${item.question}",
              "answer": "${item.answer}"
                }
              ]
            }
          `}
        </Script>
      ))}
    </>
  );
};
