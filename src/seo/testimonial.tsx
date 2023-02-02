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
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": "116"
          },
          "review": [
            ${useStrapiTestimonial().map((item) => (
        `{
          "@context": "https://schema.org/",
                "@type": "Review",
                "itemReviewed": {
                  "@type": "LocalBusiness",
                  "name": "K"
                },
                  "author": {
                    "@type": "Person",
                    "name": "${item.customer}"
                  },
                  "reviewBody": "${item.testimonial}"
                }`
      ))}
          ]
        }
      `}
    </Script>
  );
};
