import * as React from "react"
import { Link } from 'gatsby';
import Header from "./header"
import Footer from "./footer"
import Card from "./card"
import KayakFeatureList from "./kayak-feature-list";
import PaddleboardFeatureList from "./paddleboard-feature-list"
import Sport from "./sport";

function SportFeatureList(props) {
  if (props.sport === "kayak") {
    return (
      <KayakFeatureList />
    )
  } else {
    return (
      <PaddleboardFeatureList />
    )
  }
}

const FeatureLayout = (props) => {
  return (
    <>
      <Header />

      <main>
        <h1>{props.title}</h1>

        <p>{props.description}</p>
      </main>

      <section className="deck">
        {props.query.nodes.map(retail => (
          <div key={retail.id}>
            <Card
              retail={retail}
            />
          </div>
        ))
        }
      </section>

      <hr className="passage" />

      <section className="passage" >
        <h2>Browse By Feature</h2>
        <SportFeatureList sport={props.type} />
      </section>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
          </li>
          <li>
            <Link to={`/retail/${props.type}`}><Sport sport={props.type} /></Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">{props.title}</li>
        </ol>
      </nav>

      <Footer />
    </>
  )
}

export default FeatureLayout
