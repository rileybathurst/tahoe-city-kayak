import * as React from "react"

interface HourMinTypes {
  time: string & { includesColon: true };
}

const HourMin = ({ time }: HourMinTypes) => {
  if (time) {
    let hours = time.split(':')[0];
    const mins = time.split(':')[1];
    const ampm = hours >= 12 ? 'pm' : 'am';

    if (hours < 10) {
      hours = hours.replace('0', '');
    } else if (hours > 12) {
      hours = hours - 12;
    } else {
      hours = hours;
    }

    return (
      <>{hours}:{mins}<span className="unit">{ampm}</span></>
    );
  } else {
    return null;
  }
}

export default HourMin
