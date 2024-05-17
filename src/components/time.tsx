import * as React from "react"
import HourMin from "./hour-min";

const Time = (props: {
  start?: string;
  finish?: string;
  duration?: string & { includesColon: true };
}) => {
  if (props.start) {
    return (
      <h4>
        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time */}
        <time dateTime={props.start}>
          <HourMin time={props.start} /> - <HourMin time={props.finish} />
        </time>
      </h4>
    )
  }
  return (
    <h4>
      {props.duration} mins
    </h4>
  )
}

export default Time
