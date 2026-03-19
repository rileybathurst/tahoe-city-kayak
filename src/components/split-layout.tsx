import * as React from "react"
import Composition from "../components/composition";

type splitLayoutTypes = {
  content: React.ReactNode;
}
const SplitLayout = ({ content }: splitLayoutTypes) => {

  return (
    <div className="albatross wrap">

      <main>
        <div className="condor">
          {content}
        </div>
      </main>

      <div>
        <div className="condor">
          <Composition />
        </div>
      </div>
    </div>
  )
}

export default SplitLayout
