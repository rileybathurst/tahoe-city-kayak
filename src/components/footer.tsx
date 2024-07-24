import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// Paddle
import { PaddleSocials } from "@rileybathurst/paddle";
import { PaddleLocationDeck } from "@rileybathurst/paddle";

import PricingChart from "./pricing-chart";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import Phone from "./phone";
import Mail from "./mail";
import { useSiteMetadata } from "../hooks/use-site-metadata"

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
        instagram
          facebook
          tripadvisor
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
          <Link to="/">{useSiteMetadata().title}</Link>
        </h3>
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />
        <nav>
          <MenuList
            children='announcement'
          />
        </nav>
        <hr />
        <div className="footer__contact">
          <Phone />
          <Mail />
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
