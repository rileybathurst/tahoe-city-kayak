import React, { useState, useRef, useEffect } from 'react';
import { Link } from "gatsby"

import Menu from "./menu"
import PaddleIcon from '../images/paddle';
import MenuList from './menu-list';
import Logo from '../images/logo';

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

function Button() {
  const [slide, setSlide] = useState('firstload');
  const [amount, setAmount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    // console.log(ref.current.clientHeight);
    setAmount(ref.current.clientHeight);
  });

  if (slide === "firstload") {
    // console.log('first');
    return (
      <div className='menu__small'>
        <button
          className="button-styles"
          onClick={() => setSlide('close')}
        >
          <span
            style={{ transform: 'translateY(-2rem)' }}
            className="span-styles"
          >Close<br />Menu
          </span>
        </button>
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
          }}
          ref={ref}
        >
          <MenuList />
        </nav>
      </div>
    );
  } else if (slide === "menu") {
    // console.log('menu');
    return (
      <div className='menu__small'>
        <button
          className="button-styles"
          onClick={() => setSlide('close')}
        >
          <span
            style={{ transform: 'translateY(-2rem)' }}
            className="span-styles"
          >Close<br />Menu
          </span>
        </button>
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
          }}
          ref={ref}
        >
          <MenuList />
        </nav>
      </div>
    );
  } else {
    // console.log('else');
    return (
      <div className='menu__small'>
        <button
          className="button-styles"
          onClick={() => setSlide('menu')}
        >
          <span
            style={{ transform: 'translateY(0)' }}
            className="span-styles"
          >Close<br />Menu
          </span>
        </button>
        <nav
          style={{
            transform: 'translateY(0)',
            marginBottom: '-' + amount + 'px',
          }}
          ref={ref}
        >
          <MenuList />
        </nav>
      </div>
    );
  }
}

/* function Height() {
  const [height, setHeight] = 0;
  const ref = useRef();

  return (
    <>
      <div className="logo-container"

      >
        <PaddleIcon className="paddle--left" />
        <h1 className='logo'><Link to="/" className="link__subtle">Tahoe City Kayak</Link></h1>
        <PaddleIcon className="paddle--right" />
      </div>
      TODO: if this gets too big its a problem 
<Menu
  style={{
    height: height + 'px',
  }}
/>
    </>
  )
} */

const Header = () => {
  return (
    <header>
      <OpenSeason />
      <div className="logo-container" >
        {/* <PaddleIcon className="paddle--left" /> */}
        <h1 className='logo'>
          <Link to="/" className="link__subtle">
            {/* Tahoe City Kayak */}
            <Logo />
          </Link>
        </h1>
        {/* <PaddleIcon className="paddle--right" /> */}
      </div>
      <Menu />
      <Button />
    </header>
  )
}

export default Header
