import * as React from "react"
import { Link } from "gatsby"

// import PaddleIcon from '../images/paddle';
import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import KayakIcon from "../images/kayak"
import StoreIcon from "../images/store";
import CarIcon from "../images/car";
import MapLink from "../components/map-link"

const Header = () => {
  return (
    <>
      <footer>
        {/* <PaddleIcon /> */}
        <div className='logo-copy'>
          {/* <h3 className='logo'><Link to="/" className="link__subtle">Tahoe City Kayak</Link></h3> */}
          <Logo />
          <p>&copy; {new Date().getFullYear()}</p>
          <hr />
          <nav>
            <MenuList />
          </nav>
          <hr />
          <div className="footer__contact">
            <a href="phone:(530) 581-4336" rel="norel norefferer" className="button">Phone: (530) 581-4336</a>
            <a href="mailto:tahoecitykayak@gmail.com" rel="norel norefferer" className="button">tahoecitykayak@gmail.com</a>
            <hr />
            <div className="social">
              <a href="https://www.facebook.com/pages/Tahoe-City-Kayak/125337723736" target='_blank' rel='noopener noreferrer'>
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/tahoecitykayak/" target='_blank' rel='noopener noreferrer'>
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
        <div>
          <PricingChart book="no" />
          <hr />
          <section className="home__here" >
            <div className="here__location">
              <KayakIcon />
              <p>
                <strong>On Water Rental</strong><br />
                <MapLink>
                  Commons Beach<br />
                  400 North Lake Blvd,<br />
                  Tahoe City 96145<br />
                </MapLink>
              </p>

              <p>
                May &ndash; October<br />
                Open Daily<br />
                9:30am &ndash; 5:30pm<br />
                Weather Permitting<br />
              </p>
            </div>

            <div className="here__location">
              <StoreIcon />
              <p>
                <strong>Retail Location</strong><br />
                <a href="https://goo.gl/maps/qVFPpSrFGwrECb4n8" rel="norel nofollow" >
                  521 North Lake Blvd,<br />
                  Tahoe City 96145</a>
              </p>

              <p>
                Open Daily<br />
                9am &ndash; 6pm<br />
              </p>
            </div>

            <div className="here__location">
              <CarIcon />
              <p><strong>Free Parking Lot</strong><br />
                <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">Commons Beach Rd<br />
                  Tahoe City 96145
                </a>
              </p>
              <p><strong>Free On-Street Parking</strong><br />
                In front of the retail store<br />
                North Lake Blvd<br />
              </p>
            </div>
          </section>
        </div>

      </footer >

    </>
  )
}

export default Header
