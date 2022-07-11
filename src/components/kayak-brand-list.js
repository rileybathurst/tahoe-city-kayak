import * as React from "react"
import { Link } from "gatsby"

const KayakBrandList = (props) => {
  return (
    <ul>
      <li><Link to="/retail/kayak/hobie">Hobie</Link></li>
      <li><Link to="/retail/kayak/wilderness-systems">Wilderness Systems</Link></li>
      <li><Link to="/retail/kayak/eddyline">Eddyline</Link></li>
      <li><Link to="/retail/kayak/perception">Perception</Link></li>
      <li><Link to="/retail/kayak/delta">Delta</Link></li>
      <li><Link to="/retail/kayak/bote">BOTE</Link></li>
      <li><Link to="/retail/kayak/bru-surf">Bru Surf</Link></li>
    </ul>
  )
}

export default KayakBrandList
