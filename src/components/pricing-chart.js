import * as React from "react"

const PricingChart = () => {
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
      <button>Book Now</button>
    </>

  )
}

export default PricingChart
