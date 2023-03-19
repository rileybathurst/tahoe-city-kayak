import * as React from "react"

import Rentals from "./rentals";
import Store from "./store";
import Parking from "./parking";
import Delivery from "./delivery";

const Complete = () => {
  return (
    <div className="locations__complete">
      <Rentals />
      <Store />
      <Parking />
      <Delivery />
    </div>
  )
}

export default Complete
