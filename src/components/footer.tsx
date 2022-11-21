import * as React from "react"

import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import Complete from './locations/complete';

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
            <Complete />
          </section>
        </div>

      </footer >

    </>
  )
}

export default Header