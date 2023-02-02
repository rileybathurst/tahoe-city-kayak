import React from 'react';
import { Script } from "gatsby";
import { useStrapiTestimonial } from "../hooks/use-strapi-testimonial"

export const TestimoialSEO = () => {
  const { } = useStrapiTestimonial()

  // * this has hard coded data from google rankings dated Feb 2 2023
  // I dont know if I can get around that as google requires an aggregateRating

  // TODO: This produces double reviews for each, one is correct and one isnt

  return (
    <Script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Tahoe City Kayak and Padddleboard",
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
                  "name": "Tahoe City Kayak and Padddleboard"
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
