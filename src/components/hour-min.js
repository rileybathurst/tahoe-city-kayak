import * as React from "react"

// TODO make an am pm splitter
const HourMin = (props) => {
  if (props.time) {
    let hours = props.time.split(':')[0];
    let mins = props.time.split(':')[1];
    return (
      <>{hours}:{mins}</>
    );
  } else {
    return null;
  }
}

export default HourMin
