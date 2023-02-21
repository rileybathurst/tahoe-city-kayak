import React, { useState, useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"

import Menu from "./menu"
// import PaddleIcon from '../images/paddle';
import MenuList from './menu-list';
import Logo from '../images/logo';
import { propTypes } from 'gatsby-plugin-image/dist/src/components/gatsby-image.server';

// const isBrowser = typeof window !== "undefined"

function OpenSeason(props) {
  const [banner, setBanner] = useState('shown');

  useEffect(() => {
    // setBanner(JSON.parse(window.localStorage.getItem('banner')));
    setBanner(window.localStorage.getItem('banner'));
  }, []);

  // this has to be a secondary or it gets in a loop
  useEffect(() => {
    window.localStorage.setItem('banner', banner);
  }, [banner]);

  const closeBanner = () => {
    return setBanner('hidden');
  }

  const openBanner = () => {
    return setBanner('shown');
  }

  let topbar = props.topbar;

  return (
    <>
      <div className={`top-wrapper ${banner}`}>
        {/* <div className="top-wrapper__staygold">test</div> */}
        <div className="top-bar">
          <p>{topbar}</p>
        </div>
        <button onClick={closeBanner} className="season">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48'>
            <title>up arrow</title>
            <path d="m24 31.4 7.3-7.3-2.1-2.1-3.7 3.7v-9.1h-3v9.1L18.8 22l-2.1 2.1ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
        </button>
        <button onClick={openBanner} className="reseason">{/* stay gold */}</button>
        {/* <div className="top-wrapper__staygold">test</div> */}
      </div>
      {/* // TODO this needs more work */}
      {/* {process.env.NODE_ENV === "development" ? (
        <button onClick={openBanner}>Put the banner back</button>
      ) : null} */}
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
      <div className='menu__small'
        style={{
          height: '2rem',
        }}
      >
        <button
          className="button-styles"
          onClick={() => setSlide('close')}
        >
          <span
            style={{ transform: 'translateY(-2rem)' }}
            className="span-styles"
          >CLOSE<br />MENU
          </span>
        </button>
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
            visibility: "hidden",
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
          >CLOSE<br />MENU
          </span>
        </button>
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
            visibility: "hidden",
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
      <div className='menu__small'
        style={{
          height: '2rem',
        }}
      >
        <button
          className="button-styles"
          onClick={() => setSlide('menu')}
        >
          <span
            style={{ transform: 'translateY(0)' }}
            className="span-styles"
          >CLOSE<br />MENU
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

const Header = () => {

  const { strapiTopbar } = useStaticQuery(graphql`
    query TopBarQuery {
      strapiTopbar {
        text
      }
    }
  `)

  return (
    <header>

      {/*
      // TODO this would be nice to be able to close but I dont have it right yet
      <StaticQuery
        query={query}
        render={data => (
          <OpenSeason topbar={data.strapiTopbar.text} />
        )}
      /> */}

      {/* // I renamed this as it was conflicting with the topbar that moves */}
      <div className="cap">
        <p>{strapiTopbar.text}</p>
      </div>

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
