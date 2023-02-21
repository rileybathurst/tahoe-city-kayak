import * as React from "react"

import CarIcon from "../../images/car";

const Parking = () => {
  return (
    <section className="location">
      <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer" aria-label="free parking lot map icon">
        <CarIcon />
      </a>
      <p><strong>Free Parking Lot</strong><br />
        <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">Commons Beach Rd<br />
          Tahoe City 96145
        </a>
      </p>
      <p><strong>Free On-Street Parking</strong><br />
        In front of the retail store<br />
        North Lake Blvd<br />
      </p>
    </section>
  )
}

export default Parking
