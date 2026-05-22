import * as React from "react"

function Sport({ sport }: { sport: string }) {

  // TODO: check on the plural seems like that would also need the "S"
  if (sport === "sup" || sport === "sups") {
    return (
      <React.Fragment>Paddle board</React.Fragment>
    )
  } else {
    return (
      <React.Fragment>{sport}</React.Fragment>
    )
  }
}

export default Sport
