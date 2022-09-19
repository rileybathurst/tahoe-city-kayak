import React from 'react';
import PropTypes from 'prop-types';

export const Typography = ({ primary }) => {
  const mode = primary ? 'storybook-Typography--primary' : 'storybook-Typography--secondary';
  return (
    <>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>Paragraph</p>

      <p className='typography__secondary'>
      typography__secondary
      </p>

      <hgroup class="crest">
        <h3 class="brow">Brow</h3>
        <h3 class="supra">Supra</h3>
      </hgroup>
      <p>These can be any version of h to be a well styled html doc as long as they have the hgroup wrapper with a class of crest</p>
    </>
  );
};

Typography.propTypes = {
  primary: PropTypes.bool,
};

Typography.defaultProps = {
  primary: false,
};