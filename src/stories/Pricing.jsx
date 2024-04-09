import React from "react";
import PropTypes from "prop-types";

// import "../styles/styles.css";

export const Pricing = ({ primary }) => {
  const mode = primary
    ? "storybook-Pricing--primary"
    : "storybook-Pricing--secondary";
  return (
    <>
      <div className="pricing-chart">
        <div>
          <h4>
            <span>Rental</span> <span>Rates</span>
          </h4>
          <p>1 Hour</p>
          <p>
            <span>3 Hours</span>
          </p>
          <p>
            <span>Full Day</span>
          </p>
        </div>
        <div>
          <h4>
            <span>Single Kayak</span>
            <span> / Paddleboard</span>
          </h4>
          <p>$30</p>
          <p>$60</p>
          <p>$90</p>
        </div>
        <div>
          <h4>
            <span>Tandem</span> <span>Kayak</span>
          </h4>
          <p>$45</p>
          <p>$90</p>
          <p>$110</p>
        </div>
      </div>
      <div
      // className={`pricing-chart__${props.book}`}
      >
        {/* // ? this might need a props if it comes in */}
        <p>Rentals can be booked in advance with the button below!</p>

        <button>Book Now</button>
      </div>
    </>
  );
};

Pricing.propTypes = {
  primary: PropTypes.bool,
};

Pricing.defaultProps = {
  primary: false,
};
