import React, { useState } from 'react';
import { Script } from "gatsby";
import { SEO } from "../components/seo";
import { useStrapiTopBar } from "../hooks/use-strapi-topbar";

// this doesnt feel like its the right track as im back to returning a function

export const StrapiBottom = () => {
  const {
    bottom,
  } = useStrapiTopBar();

  const sb = bottom;

  return (
    <>
      <title>
        {sb}
      </title>
    </>
  );
};

export default StrapiBottom;
