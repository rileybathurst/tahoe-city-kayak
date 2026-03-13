import React from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import { MenuList } from './menu-list';
import Logo from '../images/logo';
import { PaddleTopBar, PaddleMenu } from '@rileybathurst/paddle';

const Header = () => {

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
        peek_base

        topbar {
          data {
            topbar
          }
        }
      }
    }
  `)

  return (
    <header>

      {/* // TODO: weather day needs to be implemented */}
      <PaddleTopBar {...data} />
      <p className='sr-only'>
        {data.strapiBranch.name} Kayak & Paddleboard rentals and tours
      </p>
      <div className="logo-container" >
        <Link to="/" className="">
          <Logo />
        </Link>
      </div>
      
      <hr />
      <PaddleMenu
        menu_items={MenuList}
        peek_base={data.strapiBranch.peek_base}
        strapiBranchName={data.strapiBranch.name}
      />
      <hr />
      
    </header >
  )
}

export default Header
