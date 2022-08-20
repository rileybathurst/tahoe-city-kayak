import * as React from "react";

import KayakIcon from "../images/kayak"
import StoreIcon from "../images/store";
import CarIcon from "../images/car";
import MapLink from "../components/map-link"

const Here = () => {
  return (
    <section className="home__here" >
      <div className="here__location">
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
      </div>

      <div className="here__location">
        <StoreIcon />
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
      </div>

      <div className="here__location">
        <CarIcon />
        <p><strong>Free Parking Lot</strong><br />
          <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">Commons Beach Rd<br />
            Tahoe City 96145
          </a>
        </p>
        <p><strong>Free On-Street Parking</strong><br />
          In front of the retail store<br />
          North Lake Blvd<br />
        </p>
      </div>
    </section>
  )
}

export default Here
