import * as React from "react"

function Sport({ sport }: { sport: string }) {

  // TODO: check on the plural seems like that would also need the "S"
  if (sport === "sup" || sport === "sups") {
    return (
      <>Paddle board</>
    )
  } else {
    return (
      <>{sport}</>
    )
  }
}

export default Sport
