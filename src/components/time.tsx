import * as React from "react"
import HourMin from "./hour-min";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time

const Time = (props: {
  start?: string;
  finish?: string;
  duration?: string & { includesColon: true };
}) => {
  if (props.start) {
    return (
      <time dateTime={props.start} >
        <HourMin time={props.start} /> - <HourMin time={props.finish} />
      </time>
    )
  }
  return (
    <>
      {props.duration} mins
    </>
  )
}

export default Time
