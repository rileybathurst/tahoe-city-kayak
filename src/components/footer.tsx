import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { PaddleSocials, PaddleLocationDeck } from "@rileybathurst/paddle";

import PricingChart from "./pricing-chart";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import Phone from "./phone";

const Footer = () => {

  const data = useStaticQuery(graphql`
    query FooterQuery {
      allStrapiLocation(
        filter: {
          locale: {slug: {eq: "tahoe-city"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      strapiLocale(slug: {eq: "tahoe-city"}) {
        name
        instagram
        facebook
        tripadvisor
        email
      }

      allStrapiLocale(filter: {slug: {ne: "tahoe-city"}}) {
        nodes {
          name
          url
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
          <Link to="/">{data.strapiLocale.name}</Link>
        </h3>
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />
        <nav>
          <MenuList>
            <li key='announcement'>
              <Link
                to="/announcement"
                className='link__backed'
                activeClassName="active">
                Announcements
              </Link>
            </li>
          </MenuList>

        </nav>
        <hr />
        <div className="footer__contact">
          <Phone />
          <a
            href={`mailto:${data.strapiLocale.email}`}
            rel="norel norefferer"
            className="button"
          >
            {data.strapiLocale.email}
          </a>
          <hr />
          <PaddleSocials
            instagram={data.strapiLocale.instagram}
            facebook={data.strapiLocale.facebook}
            tripadvisor={data.strapiLocale.tripadvisor}
          />
        </div>
        <hr />
        <div className="footer__locations">
          <h3>Our Partner Locations</h3>
          <ul>
            {data.allStrapiLocale.nodes.map((locale: LocaleTypes) => (
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
        <PricingChart book={false} />
        <hr />

        <PaddleLocationDeck
          {...data.allStrapiLocation}
          background={false}
        />

      </div>

    </footer >
  )
}

export default Footer
