// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Backgrounds = ({ primary }) => {
  const mode = primary ? 'storybook-Backgrounds--primary' : 'storybook-Backgrounds--secondary';
  return (
    <>
      <section>
        Default Body
      </section>
      <section className="background__1">
        background__1<br />
        Sand / Ink
      </section>

      {/*       <section className="background__2">
        background__2<br />
        I like this a lot less, it feels out of the theme
      </section> */}

      <section className="background__3">
        background__3<br />
        {/* I like this a lot less, it feels out of the theme */}
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