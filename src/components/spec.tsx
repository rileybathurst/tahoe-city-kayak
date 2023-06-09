import React from "react";
import Remainder from "./remainder";

function Spec(props: {
  name: string;
  spec: string | number | boolean;
  unit?: string;
  unitPlace?: string;
  unitSpace?: string;
}) {
  if (props.name === 'length' || props.name === 'width') {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3><Remainder inches={props.spec} /></h3>
      </div>
    );
  } else if ((props.spec) && (props.unitPlace == "before")) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3 className="spec-flex unit-place__before">
          <span className="specification">{props.spec}</span>&thinsp;
          <span className="unit">{props.unit}</span>
        </h3>
      </div>
    );
  } else if (props.spec === true) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3>Yes</h3>
      </div>
    );
  } else if (props.spec) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3>
          {props.spec}
          <span className="spec__unit">&thinsp;{props.unit}</span>
        </h3>
      </div>
    );
  } else {
    return null;
  }
}

export default Spec;