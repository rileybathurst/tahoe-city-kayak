// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Collage = ({ primary }) => {
const mode = primary ? 'storybook-Collage--primary' : 'storybook-Collage--secondary';
return (
<>
I think we need 2 very specific ones<br />
one for the cards<br />
one for the<br />

collage is for the cards
Montage is for the other

<br />
main__photo-grid already exists
</>
);
};

Collage.propTypes = {
primary: PropTypes.bool,
};

Collage.defaultProps = {
primary: false,
};