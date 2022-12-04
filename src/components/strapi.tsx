import React from 'react';
import { Script } from "gatsby";
import { useStrapiData } from "../hooks/use-strapi-data"

export const Strapi = () => {
  const {
    name
  } = useStrapiData()

  const strapi = {
    name: name
  };

  return (
    <>
      <Script type="application/ld+json">
        {`
          {
            "name": "${strapi.name}"
          }
        `}
      </Script>
    </>
  );
};
