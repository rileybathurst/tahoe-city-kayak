// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Layout = ({ primary }) => {
const mode = primary ? 'storybook-Layout--primary' : 'storybook-Layout--secondary';
return (
<>
{/* // ? do I need to rebuild the header and footer here? */}
header<br />
<main>
  <article>
    <h1>Layout</h1>
    <section>Section</section>
  </article>

</main>
footer<br />
</>
);
};

Layout.propTypes = {
primary: PropTypes.bool,
};

Layout.defaultProps = {
primary: false,
};