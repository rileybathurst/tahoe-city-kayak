import React, { useState } from 'react';
import { Script } from "gatsby";
import { SEO } from "../components/seo";
import { useStrapiTopBar } from "../hooks/use-strapi-topbar";

const person = "Mike";
const age = 28;

// console.log`useStrapiTopBar()`;

function myTag(strings, personExp, ageExp) {
  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const a3 = useStrapiTopBar();
  // console.log(a3);

  const ageStr = ageExp > 99 ? "centenarian" : "youngster";

  // console.log('🦖');

  // console.log(useStrapiTopBar()); // Im not allowed to call this here
  //  I think it has to be called in the component? const? something like that

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const StrapiTop = myTag`That ${person} is a ${age}.`;

export default StrapiTop;
