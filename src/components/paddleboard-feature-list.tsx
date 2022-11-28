import * as React from "react";
import { Link } from "gatsby";

// eventually I could do something to not show the page its on but for now I'll leave it like this

const PaddleboardFeatureList = () => {
  return (
    <ul className="feature-list">
      <li key='inflatable'><Link to="/retail/sup/inflatable">Inflatable</Link></li>
    </ul>
  )
}

export default PaddleboardFeatureList
