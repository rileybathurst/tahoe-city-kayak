// * this isnt a page its a typesafe test
// can I use generics thats page /spec-generic.tsx

import * as React from "react"

interface SpecsTypes {
  [key: string]: string | number | boolean;
}
function Specs(specs: SpecsTypes) {

  console.log(specs);

  return (
    Object.entries(specs).map(([key, value]) => {

      // ? is it possible to use generics to not have to check this?
      if (key === 'length' && typeof value === 'number') {
        return (
          <div>
            <h2>{key}</h2>
            <h3>{value / 2}</h3>
          </div>
        );
      }

      if (typeof value === 'boolean') {
        return (
          <div key={key}>
            <h2>{key}</h2>
            <h3>Yes</h3>
          </div>
        );
      }

      return (
        <div key={key}>
          <h2>{key}</h2>
          <h3>{value}</h3>
        </div>
      )

    })
  );
}

const SpecTwoPage = () => {

  return (
    <>
      test
      <Specs
        name="hello"
        length={12}
        maybe={true}
      />
    </>
  )
}

export default SpecTwoPage
