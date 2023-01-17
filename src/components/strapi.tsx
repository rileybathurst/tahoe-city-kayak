// ? Check what I was building here

import React from 'react';
import { Script } from "gatsby";
import { useStrapiData } from "../hooks/use-strapi-data"

export const Strapi = () => {

  const {
    name
  } = useStrapiData()

  console.log(useStrapiData());
  console.log(useStrapiData().name);

  const strapi = {
    name: name
  };

  console.log(strapi);
  // this keeps the useStrapiData info

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
