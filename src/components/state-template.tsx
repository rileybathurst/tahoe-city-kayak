import React, { useState } from 'react';

const StateTemplate = (props) => {
  const [x, setX] = useState(0);

  return (
    <>
      {x}
    </>
  );
};

export default StateTemplate;