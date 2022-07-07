import * as React from "react"

const PricingChart = (props) => {
  return (
    <>
      <div className="pricing-chart">
        <div>
          <h4>Rental Rates</h4>
          <p>1 Hour</p>
          <p>3 Hours</p>
          <p>Full Day</p>
        </div>
        <div>
          <h4>Single Kayak / SUP</h4>
          <p>$30</p>
          <p>$60</p>
          <p>$90</p>
        </div>
        <div>
          <h4>Tandem Kayak</h4>
          <p>$45</p>
          <p>$90</p>
          <p>$110</p>
        </div>
      </div>
      <div className={`pricing-chart__${props.book}`}>
        <button>Book Now</button>
      </div>
    </>

  )
}

export default PricingChart
