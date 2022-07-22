import * as React from "react"
import { Link } from "gatsby"

import PaddleIcon from '../images/paddle';
import Menu from "./menu"
import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";

const Header = () => {
  return (
    <footer>
      <PaddleIcon />
      <div className='logo-copy'>
        <h3 className='logo'><Link to="/" className="link__subtle">Tahoe City Kayak</Link></h3>
        &copy; {new Date().getFullYear()}
        <nav>
          <MenuList />
        </nav>
        <div>
          <p><a href="phone:(530) 581-4336" rel="norel norefferer">Phone: (530) 581-4336</a></p>
          <p><a href="mailto:tahoecitykayak@gmail.com" rel="norel norefferer">tahoecitykayak@gmail.com</a></p>
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
      <PricingChart book="no" />
    </footer>
  )
}

export default Header
