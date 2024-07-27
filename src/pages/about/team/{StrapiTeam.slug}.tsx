// This doesnt work as it queries everyone it shouldnt

import * as React from "react"

import Header from "../../../components/header";
import Footer from "../../../components/footer";

export const strapiTeam = graphql`
  query TeamPageQuery($slug: String!) {
  strapiTeam(slug: { eq: $slug }) {