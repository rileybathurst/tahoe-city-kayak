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
    <Script type="application/ld+json">
      {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${useStrapiMap().map((item) => (
        `{
          "@type": "Question",
                  "name": "${item.question}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                  "text": "${item.answer}"
                }
                }`
      ))}
            ]
          }s
          `}
    </Script>
  );
};
