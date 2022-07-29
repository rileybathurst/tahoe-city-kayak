import * as React from "react"

// TODO make an am pm splitter
const HourMin = (props) => {
  if (props.time) {
    let hours = props.time.split(':')[0];
    let mins = props.time.split(':')[1];
    let ampm = hours >= 12 ? 'pm' : 'am';

    if (hours > 12) {
      hours = hours - 12;
    }

    return (
      <>{hours}:{mins}&thinsp;<span className="unit">{ampm}</span></>
    );
  } else {
    return null;
  }
}

export default HourMin
