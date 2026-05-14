import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { PaddleFooter } from "@rileybathurst/paddle";

import { MenuList } from './menu-list';
import Logo from "../images/logo";

const Footer = ({ topHR }: { topHR?: boolean }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {

      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
        instagram
        facebook
        tripadvisor
        email
        season_start
        season_end
        phone
        slug
      }

      allStrapiBranch(filter: {slug: {ne: "tahoe-city"}}) {
        nodes {
          name
          url
        }
      }

      allStrapiAnnouncement(
        filter: 
        {
          branches: {elemMatch: {slug: {eq: "tahoe-city"}}},
          featured: {eq: true}
        }
      )  {
        nodes {
          id
          title
          slug
        }
      }

      allStrapiRentalRate(filter: {favorite: {eq: true}}) {
        nodes {
          ...pricingChartFragment
        }
      }

      allStrapiLocation (
        filter: {
          branch: {slug: {eq: "tahoe-city"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }
    }
  `)

  const MenuPlus = [...MenuList,
  { href: "/group", label: "Group" },
  { href: "/membership", label: "Membership" },
  { href: "/announcement", label: "Announcements" },
  ...data.allStrapiAnnouncement.nodes.map((announcement: { title: string, slug: string }) => (
    { href: `/announcement/${announcement.slug}`, label: announcement.title }
  ))
  ]

  return (
    <PaddleFooter
      topHR={Boolean(topHR)}
      strapiBranch={data.strapiBranch}
      logo={<Logo />}
      allStrapiBranch={data.allStrapiBranch}
      allStrapiRentalRate={data.allStrapiRentalRate}
      allStrapiLocation={data.allStrapiLocation}
      MenuPlus={MenuPlus}
    />
  )
}

export default Footer
