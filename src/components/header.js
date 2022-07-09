import React, { useState, useRef, useEffect } from 'react';
import { Link } from "gatsby"

import Menu from "./menu"
import PaddleIcon from '../images/paddle';
import MenuList from './menu-list';

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
          >Open<br />Menu
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

/* 
// TODO 
function Peeks() {

  return (
    <script type="text/javascript">
      (function(config) {
        window._peekConfig = config || {};

      var idPrefix = 'peek-book-button';

      var id = idPrefix+'-js'; if (document.getElementById(id)) return;

      var head = document.getElementsByTagName('head')[0];

      var el = document.createElement('script'); el.id = id;

      // date i can do
      var date = new Date; var stamp = date.getMonth()+"-"+date.getDate();

      // base
      var basePath = "https://js.peek.com";


      el.src = basePath + "/widget_button.js?ts="+stamp;

      head.appendChild(el); id = idPrefix+'-css'; el = document.createElement('link'); el.id = id;

      el.href = basePath + "/widget_button.css?ts="+stamp;

      el.rel="stylesheet"; el.type="text/css"; head.appendChild(el);
      })

      ({key: '6477fc17-231d-4d85-9a8e-a46e835d5e3b' });
    </script>
  );
} */

const Header = () => {
  return (
    <header>
      <OpenSeason />
      <div className="logo-container">
        <PaddleIcon className="paddle--left" />
        <h1 className='logo'><Link to="/" className="link__subtle">Tahoe City Kayak</Link></h1>
        <PaddleIcon className="paddle--right" />
      </div>
      <Menu />
      <Button />
      {/* <h2>North Tahoe&rsquo;s Premier Kayak &amp; SUP Provider of&nbsp;
        <Link to="/rentals-demos" className="link__subtle">Rentals</Link>,&nbsp;
        <Link to="/retail" className="link__subtle">Sales</Link>,&nbsp;
        <Link to="/tours-lessons" className="link__subtle">Lessons &amp; Tours</Link>
  </h2> */}
    </header>
  )
}

export default Header
