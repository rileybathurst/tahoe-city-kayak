import * as React from "react";
import { Link } from "gatsby";

// eventually I could do something to not show the page its on but for now I'll leave it like this

const KayakFeatureList = (props) => {
  return (
    <ul className="feature-list">
      <li key='tandem'><Link to="/retail/kayak/tandem">Tandem</Link></li>
      {/* // * currently these are the same as paddledrive this might have to change */}
      <li key='paddle'><Link to="/retail/kayak/hobie">Paddle Drive</Link></li>
      <li key='ultralight'><Link to="/retail/kayak/ultralight">UltraLight</Link></li>
      <li key='ultralight-tandem'><Link to="/retail/kayak/ultralight-tandem">UltraLight Tandems</Link></li>
      {/* <li key='inflatable'><Link to="/retail/kayak/inflatable">Inflatable</Link></li> */}
    </ul>
  )
}

export default KayakFeatureList
