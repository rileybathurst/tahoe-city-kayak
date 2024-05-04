import React from "react";
import PropTypes from "prop-types";

// import "../styles/styles.css";

export const Pricing = ({ primary }) => {
  const mode = primary
    ? "storybook-Pricing--primary"
    : "storybook-Pricing--secondary";
  return (
    <>
      <section className="charts">
        <div className="pricing-chart">
          <div className="column">
            <h4>
              Rental
              <br />
              Rates
            </h4>
            <p>1 Hour</p>
            <p>3 Hours</p>
            <p>Full Day</p>
          </div>
          <div className="column">
            <h4>
              Single
              <br />
              Kayak
            </h4>
            <p>$30</p>
            <p>$60</p>
            <p>$90</p>
          </div>
          <div className="column">
            <h4>
              Tandem
              <br />
              Kayak
            </h4>
            <p>$45</p>
            <p>$90</p>
            <p>$110</p>
          </div>
          <div className="column">
            <h4>
              Paddle
              <br />
              Board
            </h4>
            <p>$30</p>
            <p>$60</p>
            <p>$90</p>
          </div>
        </div>

        <div className="pricing-chart">
          <>
            <p className="test">Pedal Drive</p>
            <p className="test">+10</p>
            <p className="test">+20</p>
            <p className="">+10</p>
          </>
        </div>
      </section>

      <div
      // className={`pricing-chart__${props.book}`}
      >
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
