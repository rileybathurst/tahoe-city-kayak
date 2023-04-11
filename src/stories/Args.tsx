// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

interface ArgsProps {
  label: string;
  primary: boolean;
}

export const Args = (Args: ArgsProps) => {

  return (
    <>
      {Args.label}
    </>
  );
};

Args.propTypes = {
  primary: PropTypes.bool,
  label: PropTypes.string,
};
