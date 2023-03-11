// TODO I started building this from a query but the linkswere more annoying than doing it this way
import * as React from "react"
import { Link } from 'gatsby';

const Ultralight = () => {
  return (
    <>
      <div className="paragraph-list">
        <p>Many companies are finding ways to make their kayaks or paddleboards weigh less.</p>
        <ul>
          <li><Link to="/retail/kayak/eddyline">Eddyline Kayaks</Link> uses a lightweight polycarbonate material called “Carbonlite” that mimics the properties of fiberglass, but is far more durable. Both fiberglass and Carbonlite are considerably lighter than the polyethylene plastics that most kayaks are constructed with.</li>
          <li><Link to="/retail/kayak/hobie">Hobie</Link> and <Link to="/retail/sup/pauhana">Pau Hana</Link> are using the latest inflatable technology on some of their watercraft, and have been able to shave about 20% of the weight that their older inflatable designs had.</li>
          <li>Oru kayaks has made a folding kayak out of an innovative polymer. Some of their models are weighing in around 20 lbs.</li>
        </ul>
      </div>

      {/* <p>Many companies are finding ways to make their kayaks or paddleboards weigh less. <Link to="/retail/kayak/eddyline">Eddyline Kayaks</Link> uses a lightweight polycarbonate material called “Carbonlite” that mimics the properties of fiberglass, but is far more durable. Both fiberglass and Carbonlite are considerably lighter than the polyethylene plastics that most kayaks are constructed with. <Link to="/retail/kayak/hobie">Hobie</Link> and <Link to="/retail/sup/pauhana">Pau Hana</Link> are using the latest inflatable technology on some of their watercraft, and have been able to shave about 20% of the weight that their older inflatable designs had. Oru kayaks has made a folding kayak out of an innovative polymer. Some of their models are weighing in around 20 lbs.</p> */}
    </>
  )
}

export default Ultralight
