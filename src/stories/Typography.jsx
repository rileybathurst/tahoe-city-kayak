import React from "react";
import PropTypes from "prop-types";

export const Typography = ({ primary }) => {
  const mode = primary
    ? "storybook-Typography--primary"
    : "storybook-Typography--secondary";
  return (
    <>
      <h1>everest</h1>
      <h2>aconcagua</h2>
      <h3>denali</h3>
      <h4>kilimanjaro</h4>
      <h5>elbrus</h5>
      <h6>vinson</h6>
      <p>kosciuszko</p>

      <hr />

      {/* // TODO: fix this naming */}
      <p className="typography__secondary">typography__secondary</p>

      <hr />

      <hgroup class="crest">
        {/* // TODO: only one h and then p */}

        <p class="brow">Brow</p>
        <h3 class="supra">Supra</h3>
      </hgroup>
      <p>
        These can be any version of h to be a well styled html doc as long as
        they have the hgroup wrapper with a class of crest
      </p>
    </>
  );
};

Typography.propTypes = {
  primary: PropTypes.bool,
};

Typography.defaultProps = {
  primary: false,
};
