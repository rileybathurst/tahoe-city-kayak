import * as React from "react"

const Fitness = (props) => {
  if (props.fitness) {
    return (
      <h4 className="capitalize">
        {props.fitness} <span className="">Fitness</span>
      </h4>
    )
  } else {
    return null;
  }
}

export default Fitness
