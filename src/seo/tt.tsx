import React, { useState } from 'react';
import { Script } from "gatsby";
import { SEO } from "../components/seo";
import { useStrapiTopBar } from "../hooks/use-strapi-topbar";

const TT() {
  // const TT = 'useStrapiTopBar()';
  const Counter = useStrapiTopBar(); // Hooks can only be called inside of the body of a function component
  const [count, setCount] = useState(0);

  console.log('🦖');

  return (
    { count }
  );
}
// console.log(TT);

export default TT;
