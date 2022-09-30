import * as React from "react"

import KayakIcon from "../../images/kayak"
import MapLink from "../map-link"

const Rentals = () => {
  return (
    <section className="location">
      <KayakIcon />
      <p>
        <strong>On Water Rental</strong><br />
        <MapLink>
          Commons Beach<br />
          400 North Lake Blvd,<br />
          Tahoe City 96145<br />
        </MapLink>
      </p>

      <p>
        May &ndash; October<br />
        Open Daily<br />
        9:30am &ndash; 5:30pm<br />
        Weather Permitting<br />
      </p>
    </section>
  )
}

export default Rentals
