import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { PaddleSocials } from "@rileybathurst/paddle";

import PricingChart from "./pricing-chart";
import { MenuList } from './menu-list';
import Logo from "../images/logo";
import Phone from "./phone";

// import type { AnnouncementType } from "../types/announcement-type";
import LocationDeck from "./location-deck";
import BookNow from "./book-now";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      allStrapiLocation(
        filter: {
          local: {slug: {eq: "tahoe-city"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }

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
    {href: "/announcement", label: "Announcements"},
    ...data.allStrapiAnnouncement.nodes.map((announcement: {title: string, slug: string}) => (
      {href: `/announcement/${announcement.slug}`, label: announcement.title}
    ))
  ]

  return (
    <footer>
      {/* // * holds together a flex */}
      <div>
        <h3 className='sr-only'>
          <Link to="/">{data.strapiBranch.name}</Link>
        </h3>
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />

        <nav className="nav" aria-label="Footer navigation">
            {/* // * is always open  */}
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

        <hr />
        <div className="footer__contact">
          <div className="multi_button">
            <Phone />
            <a
              href={`mailto:${data.strapiBranch.email}`}
              rel="norel norefferer"
              className="button"
            >
              {data.strapiBranch.email}
            </a>
          </div>
          <hr />
          <PaddleSocials
            instagram={data.strapiBranch.instagram}
            facebook={data.strapiBranch.facebook}
            tripadvisor={data.strapiBranch.tripadvisor}
          />
        </div>
        <hr />
        <div className="footer__locations">
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
      </div>
      <div>
        <PricingChart />
        <hr />

        <LocationDeck
          allStrapiLocation={data.allStrapiLocation}
        />

      </div>

    </footer >
  )
}

export default Footer
