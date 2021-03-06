import * as React from "react"

// Commons Beach address
const MapLink = (props) => {
  return (
    <a
      href="https://goo.gl/maps/atoK4oyJRbV3EKuK9"
      rel="noopener noreferrer"
      className={props.className}
    >
      {props.children}
    </a>
  )
}

export default MapLink
