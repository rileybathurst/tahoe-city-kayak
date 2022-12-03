import * as React from "react"

function Sport(props: { sport: string }) {
  if (props.sport === "sup") {
    return (
      <>Paddleboard</>
    )
  } else if (props.sport === "sups") {
    return (
      <>Paddleboards</>
    )
  } else {
    return (
      <>{props.sport}</>
    )
  }
}

export default Sport
