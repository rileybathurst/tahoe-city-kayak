import * as React from "react"

const Danger = (props: { svg: string; }) => {
  const svg = (props.svg);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Danger
