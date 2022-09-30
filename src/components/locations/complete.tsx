import * as React from "react"

import Rentals from "./rentals";
import Store from "./store";
import Parking from "./parking";

const Complete = () => {
  return (
    <div className="locations__complete">
      <Rentals />
      <Store />
      <Parking />
    </div>
  )
}

export default Complete
