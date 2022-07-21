import * as React from "react"
import { Link } from "gatsby"
import BookNow from "./peek/book-now"

const MenuList = (props) => {
  return (
    <ul>
      <li><Link to="/rentals-demos" className='link__backed'>Rentals &amp; Demos</Link></li>
      <li><Link to="/tours-lessons" className='link__backed'>Tours &amp; Lessons</Link></li>
      <li><Link to="/retail" className='link__backed'>Retail</Link></li>
      <li><Link to="/about" className='link__backed'>More Info</Link></li>
      <li><BookNow /></li>
    </ul>
  )
}

export default MenuList
