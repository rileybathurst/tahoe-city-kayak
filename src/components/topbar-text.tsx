// TODO this might not be used I think it was testing

import React, { useState } from 'react';
import { StaticQuery, graphql } from "gatsby"

function Query(props) {

  const [x, setX] = useState('test');
  {/* <StaticQuery
    query={query}
    render={data => (
      <>{data.strapiTopbar.text}</>
    )}
  /> */}

  // return a string not an object

  return (
    { x }
  )
}

const TopBarText = { Query }

export default TopBarText

const query = graphql`
query TopBarTextQuery {
  strapiTopbar {
    text
  }
}
`