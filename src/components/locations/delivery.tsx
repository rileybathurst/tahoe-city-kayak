import * as React from "react"
import { Link } from "gatsby"
import ShippingIcon from "../../images/shipping";

const Parking = () => {
  return (
    <section className="location">
      {/* js link these together for css hover */}
      <Link to="/delivery"><ShippingIcon /></Link>
      {/* // ! needs shortening from Andy try chatGPT first */}
      <p><Link to="/delivery"><strong>Delivery</strong></Link><br />
        Retail or rental throughout the Tahoe Region and beyond
      </p>
      <p>home, vacation property, or to public beaches (where local rules and access allow)</p>
    </section >
  )
}

export default Parking
