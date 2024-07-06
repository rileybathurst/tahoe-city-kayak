// TODO: add the abiity to be able to pass in a list of items
// ! hard coded hack

import * as React from "react"
import { Link } from "gatsby"
import BookNow from "./peek/book-now"

interface MenuListTypes {
  children: string
}
const MenuList = ({ children }) => {

  if (children) {

    return (
      <ul className="menu-list">
        <li key='rentals'><Link to="/rentals" className='link__backed' activeClassName="active">Rentals</Link></li>
        <li key='tours-lessons'><Link to="/tours-lessons" className='link__backed' activeClassName="active">Tours &amp; Lessons</Link></li>
        <li key='retail'><Link to="/retail" className='link__backed' activeClassName="active">Retail</Link></li>
        <li key='about'><Link to="/about" className='link__backed' activeClassName="active">About Us</Link></li>

        <li key={children}><Link to={`/${children}`} className='link__backed capitalize' activeClassName="active">{children}s</Link></li>

        <li key='book-now'><BookNow /></li>
      </ul>
    )
  }
  return (
    <ul className="menu-list">
      <li key='rentals'><Link to="/rentals" className='link__backed' activeClassName="active">Rentals</Link></li>
      <li key='tours-lessons'><Link to="/tours-lessons" className='link__backed' activeClassName="active">Tours &amp; Lessons</Link></li>
      <li key='retail'><Link to="/retail" className='link__backed' activeClassName="active">Retail</Link></li>
      <li key='about'><Link to="/about" className='link__backed' activeClassName="active">About Us</Link></li>
      <li key='book-now'><BookNow /></li>
    </ul>
  )
}

export default MenuList
