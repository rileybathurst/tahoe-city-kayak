import * as React from "react"
import HourMin from "./hour-min";

const Time = (props) => {
  if (props.start) {
    return (
      <h4>
        <time dateTime={props.start}>
          <HourMin time={props.start} /> - <HourMin time={props.finish} />
        </time>
      </h4>
    )
  } else {
    return (
      <h4>
        {props.duration} mins
      </h4>
    )
  }
}

export default Time
