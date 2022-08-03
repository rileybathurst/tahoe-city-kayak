import * as React from "react"

const Danger = (props) => {
  const svg = (props.svg);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Danger
