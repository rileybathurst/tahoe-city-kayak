import * as React from "react"
import { Link } from "gatsby"

import Menu from "./menu"

const Header = () => {
  return (
    <header>
      <div className="top-bar">
        <p>We are OPEN for 2022&rsquo;s rental season.</p>
      </div>
      <Menu />
      <h1><Link to="/" className="link__subtle">Tahoe City Kayak</Link></h1>
      <h2>North Tahoe&rsquo;s Premier Kayak &amp; SUP Provider of&nbsp;
        <Link to="/rentals-demos" className="link__subtle">Rentals</Link>,&nbsp;
        <Link to="/retail" className="link__subtle">Sales</Link>,&nbsp;
        <Link to="/tours-lessons" className="link__subtle">Lessons &amp; Tours</Link></h2>
    </header>
  )
}

export default Header
