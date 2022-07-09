import * as React from "react"
import { Link } from "gatsby"

const MenuList = (props) => {
  return (
    <ul>
      <li><Link to="/rentals-demos">Rentals &amp; Demos</Link></li>
      <li><Link to="/tours-lessons">Tours &amp; Lessons</Link></li>
      <li><Link to="/retail">Retail</Link></li>
      <li><Link to="/about">More Info</Link></li>
      <li><button>Book Now</button></li>
    </ul>
  )
}

export default MenuList
