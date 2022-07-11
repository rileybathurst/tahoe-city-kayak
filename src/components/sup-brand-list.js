import * as React from "react"
import { Link } from "gatsby"

const SupBrandList = (props) => {
  return (
    <ul>
      <li><Link to="/retail/sup/hobie">Hobie</Link></li>
      <li><Link to="/retail/sup/cross">Cross</Link></li>
      <li><Link to="/retail/sup/tahe">Tahe</Link></li>
      <li><Link to="/retail/sup/sic">SIC</Link></li>
      <li><Link to="/retail/sup/bic">BIC</Link></li>
      <li><Link to="/retail/sup/hala">Hala</Link></li>
      <li><Link to="/retail/sup/boardworks">Boardworks</Link></li>
      <li><Link to="/retail/sup/bote">Bote</Link></li>
      <li><Link to="/retail/sup/pau-hana">Pau Hana</Link></li>
      <li><Link to="/retail/sup/drift">Drift</Link></li>
    </ul>
  )
}

export default SupBrandList
