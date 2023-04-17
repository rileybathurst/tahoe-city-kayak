// TODO am i using this? I dont think so and if i am is it in the right place?

import React from 'react';
import { Script } from "gatsby";
import { useStrapiTestimonial } from "../hooks/use-strapi-testimonial"

export const TestimoialSEO = () => {
  const { } = useStrapiTestimonial()

  // * Dont use this as google rankings doesnt like it
  // unless theres a totally open format for all to live update

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
