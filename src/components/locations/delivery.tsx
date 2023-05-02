import * as React from "react"
import { Link } from "gatsby"
import ShippingIcon from "../../images/shipping";

const Parking = () => {
  return (
    <section className="location delivery">
      {/* // TODO: js link these together for css hover */}
      <Link to="/delivery"><ShippingIcon /></Link>
      <p><Link to="/delivery"><strong>Delivery</strong></Link><br />
        We can deliver retail or rental watercraft to homes or beaches throughout the region.
        &nbsp;<a
          href="phone:(530) 581-4336"
          rel="norel norefferer"
        >
          Call: &#40;530&#41; 581-4336
        </a>.
      </p>
    </section >
  )
}

export default Parking
