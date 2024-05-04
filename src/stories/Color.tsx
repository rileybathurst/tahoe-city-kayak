// this is the Name.tsx file
// TODO: Yes I know I should do this programatically

import React from 'react';
import PropTypes from 'prop-types';

import "./color.css";

export const Color = ({ primary }) => {
  const mode = primary ? 'storybook-Color--primary' : 'storybook-Color--secondary';
  return (
    <main className='storybook-Color'>
      <h1>Color</h1>

      <section>
        <h2>Mullen</h2>
        <div className='story-color-stack'>
          <div className='story-color mullen-glow'>mullen-glow</div>
          <div className='story-color mullen'>mullen</div>
          <div className='story-color mullen-dim'>mullen-dim</div>
          <div className='story-color mullen-dull'>mullen-dull</div>
          <div className='story-color mullen-dark'>mullen-dark</div>
        </div>
      </section>



      <section>
        <h2>Sand</h2>
        <div className='story-color-stack'>

          <div className='story-color sand'>sand</div>
          <div className='story-color sand-bright'>sand</div>
          <div className='story-color sand-dim'>sand</div>
          <div className='story-color sand-dark'>sand</div>
          <div className='story-color sand-5'>sand</div>
        </div>
      </section>


      <section>
        <h2>Ink</h2>
        <div className='story-color-stack'>

          <div className='story-color ink-dark'>ink dark</div>
          <div className='story-color ink-7_5'>ink 7.5</div>
          <div className='story-color ink'>ink</div>
          <div className='story-color ink-5'>ink 5</div>
        </div>
      </section>


      <section>
        <h2>Navy</h2>
        <div className='story-color-stack'>

          <div className='story-color navy-75'>navy 75</div>
          <div className='story-color navy-62_5'>navy 62.5</div>
          <div className='story-color navy'>navy</div>
          <div className='story-color navy-12_5'>navy 12.5</div>
          <div className='story-color navy-2_5'>navy 2.5</div>
        </div>
      </section>

      <section>
        <h2>Navy - New</h2>
        <div className='story-color-stack'>
          {/* too light above here */}
          <div className='story-color navy-bright'>navy bright</div>
          <div className='story-color navy-light'>navy light</div>
          <div className='story-color navy-glow'>navy glow</div>
          <div className='story-color navy'>navy</div>
          <div className='story-color navy-dim'>navy dim</div>
          <div className='story-color navy-dull'>navy dull</div>
          {/* too dark below here */}
          {/* <div className='story-color navy-dark'>navy dark</div> */}

        </div>
      </section>

      <section>
        <h2>Sunshine</h2>
        <div className='story-color-stack'>

          <div className='story-color sunshine-brilliant'>sunshine brilliant</div>
          <div className='story-color sunshine-bright'>sunshine bright</div>
          <div className='story-color sunshine-light'>sunshine light</div>
          <div className='story-color sunshine-glow'>sunshine glow</div>
          <div className='story-color sunshine'>sunshine</div>
        </div>
      </section>

      <section>
        <h2>Sunshine - hundreds</h2>
        <div className='story-color-stack'>

          <div className='story-color sunshine-100'>sunshine 100</div>
          <div className='story-color sunshine-200'>sunshine 200</div>
          <div className='story-color sunshine-300'>sunshine 300</div>
          <div className='story-color sunshine-400'>sunshine 400</div>
          <div className='story-color sunshine'>sunshine</div>
        </div>
      </section>
    </main>
  );
};

Color.propTypes = {
  primary: PropTypes.bool,
};

Color.defaultProps = {
  primary: false,
};