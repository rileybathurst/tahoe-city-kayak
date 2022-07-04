import React, { useState, useEffect } from 'react';
import { Link } from "gatsby"

import Menu from "./menu"


function OpenSeason(key, defaultValue) {
  const [banner, setBanner] = useState('shown');

  useEffect(() => {
    // setBanner(JSON.parse(window.localStorage.getItem('banner')));
    setBanner(window.localStorage.getItem('banner'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('banner', banner);
  }, [banner]);

  const closeBanner = () => {
    return setBanner('hidden');
  }

  const openBanner = () => {
    return setBanner('shown');
  }

  return (
    <>
      <div className={`top-bar ${banner}`}>
        <p>We are currently OPEN for 2022’s rental season.</p>
        <button onClick={closeBanner}>x</button>
      </div>

      {process.env.NODE_ENV === "development" ? (
        <button onClick={openBanner}>Put the banner back</button>
      ) : null}

    </>
  );
}

const Header = () => {
  return (
    <header>
      <OpenSeason />
      <h1 className='logo'><Link to="/" className="link__subtle">Tahoe City Kayak</Link></h1>
      <Menu />
      <h2>North Tahoe&rsquo;s Premier Kayak &amp; SUP Provider of&nbsp;
        <Link to="/rentals-demos" className="link__subtle">Rentals</Link>,&nbsp;
        <Link to="/retail" className="link__subtle">Sales</Link>,&nbsp;
        <Link to="/tours-lessons" className="link__subtle">Lessons &amp; Tours</Link></h2>
    </header>
  )
}

export default Header
