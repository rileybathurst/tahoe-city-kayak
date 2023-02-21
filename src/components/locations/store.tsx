import * as React from "react"

import StoreIcon from "../../images/store";

const Store = () => {
  return (
    <section className="location">
      <a href="https://goo.gl/maps/qVFPpSrFGwrECb4n8" rel="norel nofollow" aria-label="retail location icon">
        <StoreIcon />
      </a>
      <p>
        <strong>Retail Location</strong><br />
        <a href="https://goo.gl/maps/qVFPpSrFGwrECb4n8" rel="norel nofollow" >
          521 North Lake Blvd,<br />
          Tahoe City 96145</a>
      </p>

      <p>
        Open Daily<br />
        9am &ndash; 6pm<br />
      </p>
    </section>
  )
}

export default Store
