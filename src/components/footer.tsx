import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { PaddleSocials, PaddleLocationDeck } from "@rileybathurst/paddle";

import PricingChart from "./pricing-chart";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import Phone from "./phone";

import type { AnnouncementType } from "../types/announcement-type";

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
          locales: {elemMatch: {slug: {eq: "tahoe-city"}}},
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

  interface LocaleTypes {
    name: string,
    url: string
  }

  return (
    <footer>
      {/* holds together a flex */}
      <div>
        <h3 className='sr-only'>
          <Link to="/">{data.strapiBranch.name}</Link>
        </h3>
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />
        <nav>
          <MenuList>
            <React.Fragment>
              <li key='announcement'>
                <Link
                  to="/announcement"
                  className='link__backed'
                  activeClassName="active">
                  Announcements
                </Link>
              </li>
              {data.allStrapiAnnouncement.nodes.map((announcement: AnnouncementType) => (
                <li key={announcement.id}>
                  <Link
                    to={`/announcement/${announcement.slug}`}
                    className='link__backed'
                    activeClassName="active">
                    {announcement.title}
                  </Link>
                </li>
              ))}
            </React.Fragment>
          </MenuList>

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
            {data.allStrapiBranch.nodes.map((locale: LocaleTypes) => (
              <li key={locale.name}>
                <a href={locale.url}
                  target="_blank"
                  rel='noopener noreferrer'
                >
                  {locale.name} Kayak & Paddleboard
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <PricingChart />
        <hr />

        <PaddleLocationDeck
          season_start={data.strapiBranch.season_start}
          season_end={data.strapiBranch.season_end}
          phone={data.strapiBranch.phone}
          {...data.allStrapiLocation}
        />

      </div>

    </footer >
  )
}

export default Footer
