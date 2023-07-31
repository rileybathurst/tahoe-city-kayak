import * as React from "react"
import { Link } from "gatsby"
import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import Complete from './locations/complete';

const Footer = () => {

  {
    process.env.NODE_ENV === "development" ? (
      console.error("sentry check dev")
    ) : null
  }


  return (
    <footer>
      {/* holds together a flex */}
      <div>
        <h3 className='sr-only'>
          <Link to="/">Tahoe City Kayak and Paddleboard</Link>
        </h3>
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />
        <nav>
          <MenuList />
        </nav>
        <hr />
        <div className="footer__contact">
          <a
            href="phone:(530) 581-4336"
            rel="norel norefferer"
            className="button"
          >
            Phone: &#40;530&#41; 581-4336
          </a>
          <a
            href="mailto:tahoecitykayak@gmail.com"
            rel="norel norefferer"
            className="button"
          >
            tahoecitykayak@gmail.com
          </a>
          <hr />
          <div className="social">
            <a
              href="https://www.facebook.com/pages/Tahoe-City-Kayak/125337723736"
              target='_blank' rel='noopener noreferrer'
              aria-label="tahoe city kayak and paddleboard facebook"
            >
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/tahoecitykayak/"
              target='_blank' rel='noopener noreferrer'
              aria-label="tahoe city kayak and paddleboard instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
      <div>
        <PricingChart book="no" />
        <hr />
        <section className="home__here" >
          <Complete />
        </section>
      </div>

    </footer >
  )
}

export default Footer
