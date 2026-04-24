import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { PaddleSocials } from "@rileybathurst/paddle";

import PricingChart from "./pricing-chart";
import { MenuList } from './menu-list';
import Logo from "../images/logo";
import Phone from "./phone";

import Locales from "./locales";
import BookNow from "./book-now";

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
    }
  `)

  type BranchTypes = {
    name: string,
    url: string
  }

  const MenuPlus = [...MenuList,
  { href: "/group", label: "Group" },
  { href: "/membership", label: "Membership" },
  { href: "/announcement", label: "Announcements" },
  ...data.allStrapiAnnouncement.nodes.map((announcement: { title: string, slug: string }) => (
    { href: `/announcement/${announcement.slug}`, label: announcement.title }
  ))
  ]

  return (
    <footer className="aconcagua-padding-block-start">

      {topHR && <hr />}

      <div className="logo-container logo-container_footer">
        <h3 className="sr-only">
          <Link to="/">{data.strapiBranch.name}</Link>
        </h3>
        <Link to="/" className="logo-link">
          <Logo />
        </Link>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>

      <div className="multi_button multi_button-center">
        <Phone />
        <a
          href={`mailto:${data.strapiBranch.email}`}
          rel="norel norefferer"
          className="button"
        >
          {data.strapiBranch.email}
        </a>
      </div>

      <section className="condor">

        <PaddleSocials
          instagram={data.strapiBranch.instagram}
          facebook={data.strapiBranch.facebook}
          tripadvisor={data.strapiBranch.tripadvisor}
        />
        <hr />

        <div>
          <h3>Our Partner Locations</h3>
          <ul>
            {data.allStrapiBranch.nodes.map((branch: BranchTypes) => (
              <li key={branch.name}>
                <a href={branch.url}
                  target="_blank"
                  rel='noopener noreferrer'
                >
                  {branch.name} Kayak & Paddleboard
                </a>
              </li>
            ))}
          </ul>
        </div>

      </section>

      <hr className="albatross" />

      <nav className="nav" aria-label="Footer navigation">
        {/* // * is always open */}
        <ul className="menu-list is-open">
          {MenuPlus.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          )
          )}
          <li key='book-now'>
            <BookNow />
          </li>
        </ul>
      </nav>

      <hr className="albatross" />

      <PricingChart />

      <hr className="albatross" />

      <Locales
        all={true}
      />

    </footer >
  )
}

export default Footer
