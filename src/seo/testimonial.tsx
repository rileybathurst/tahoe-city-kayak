import React from 'react';
import { Script } from "gatsby";
import { useStrapiTestimonial } from "../hooks/use-strapi-testimonial"

export const TestimoialSEO = () => {
  const {
    nodes
  } = useStrapiTestimonial()

  return (
    <Script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "TCK",
          "review": [
            ${useStrapiTestimonial().map((item) => (
        `{
                "@type": "Review",
                  "author": "${item.customer}",
                  "reviewBody": "${item.testimonial}"
                }`
      ))}
          ]
        }
      `}
    </Script>
  );
};
