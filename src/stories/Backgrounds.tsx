// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Backgrounds = ({ primary }) => {
  const mode = primary ? 'storybook-Backgrounds--primary' : 'storybook-Backgrounds--secondary';
  return (
    <>
      <section>
        Default Body
        These relate to the z index variables

        --floor: 1;
        --understory: 2;
        --canopy: 3;
        --emergent: 4;

        They get lighter as they get closer to the foreground


        default should be the darkest<br />



      </section>
      <section className="background__1">
        background__1<br />
        Sand / Ink<br />
        --understory
      </section>

      {/*       <section className="background__2">
        background__2<br />
        I like this a lot less, it feels out of the theme
      </section> */}

      <section className="background__3">
        background__3<br />
        {/* I like this a lot less, it feels out of the theme */}
        --floor
      </section>
    </>
  );
};

Backgrounds.propTypes = {
  primary: PropTypes.bool,
};

Backgrounds.defaultProps = {
  primary: false,
};