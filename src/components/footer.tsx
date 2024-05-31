import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import LocationDeck from "./location-deck";
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
          ...locationCard
        }
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
          <div className="social">
            <a
              href={useSiteMetadata().social.facebook}
              target='_blank' rel='noopener noreferrer'
              aria-label={`${useSiteMetadata().title} facebook`}
            >
              <FacebookIcon />
            </a>
            <a
              href={useSiteMetadata().social.instagram}
              target='_blank' rel='noopener noreferrer'
              aria-label={`${useSiteMetadata().title} instagram`}
            >
              <InstagramIcon />
            </a>
          </div>
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
                  {locale.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <PricingChart book={false} />
        <hr />


        <LocationDeck
          locations={data.allStrapiLocation}
          background={false}
        />

      </div>

    </footer >
  )
}

export default Footer
