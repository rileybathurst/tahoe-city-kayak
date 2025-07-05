// TODO: add the abiity to be able to pass in a list of items
// ! hard coded hack

import * as React from "react"
import { Link } from "gatsby"
import BookNow from "./book-now"

interface MenuListTypes {
  children: React.ReactElement;
}
const MenuList = ({ children }: MenuListTypes) => {
  return (
    <ul className="menu-list">
      <li key='rentals'><Link to="/rentals" className='link__backed' activeClassName="active">Rentals</Link></li>
      <li key='tours-lessons'><Link to="/tours-lessons" className='link__backed' activeClassName="active">Tours &amp; Lessons</Link></li>
      <li key='retail'><Link to="/retail" className='link__backed' activeClassName="active">Retail</Link></li>
      <li key='about'><Link to="/about" className='link__backed' activeClassName="active">About Us</Link></li>
      {children}
      <li key='book-now'><BookNow /></li>
    </ul>
  )
}

export default MenuList
