// * this isnt a page its a typesafe test
// started at page /spec-test.tsx

import * as React from "react"

interface SpecsTypes {
  // two sides of the argument
  [key: string]: string | number | boolean;
  // [key: string]: [value: string | number | boolean]; // nope
}
function Specs(specs: SpecsTypes) {
  return (
    Object.entries(specs).map(([key, value]) => {

      return (
        <div key={key}>
          <h2>{key}</h2>
          <h3>{value}</h3>
        </div>
      )

    })
  );
}

const SpecGenericPage = () => {

  return (
    <>
      test
      <Specs
        name="hello"
        length={12}
      />
    </>
  )
}

export default SpecGenericPage
