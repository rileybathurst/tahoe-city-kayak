import * as React from "react"
import BookNow from "./peek/book-now"

const PricingChart = (props) => {
  return (
    <>
      <div className="pricing-chart">
        <div>
          <h4><span>Rental</span> <span>Rates</span></h4>
          <p>1 Hour</p>
          <p><span>3 Hours</span></p>
          <p><span>Full Day</span></p>
        </div>
        <div>
          <h4><span>Single Kayak</span><span> / SUP</span></h4>
          <p>$30</p>
          <p>$60</p>
          <p>$90</p>
        </div>
        <div>
          <h4><span>Tandem</span> <span>Kayak</span></h4>
          <p>$45</p>
          <p>$90</p>
          <p>$110</p>
        </div>
      </div>
      <div className={`pricing-chart__${props.book}`}>
        <BookNow />
      </div>
    </>

  )
}

export default PricingChart
