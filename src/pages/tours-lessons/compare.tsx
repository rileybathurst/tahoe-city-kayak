import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from "react-aria-components";

// TODO: move to paddletime
// import Time from "../../components/time";
import { PaddleTime } from "@rileybathurst/paddle";

// todo: this is bad but I think in general the whole thing can be looped in a better way
type detailsTypes = {
  show: string;
  set: any[];
  setLink1?: (value: string) => void;
  setSport1?: (value: string) => void;
  setDuration1?: (value: string) => void;
  setStart1?: (value: string) => void;
  setFinish1?: (value: string) => void;
  setFitness1?: (value: string) => void;
  setLocation1?: (value: string) => void;
  setExcerpt1?: (value: string) => void;
  setMinimum1?: (value: number) => void;
  setPrice1?: (value: number) => void;
  setPeeks1?: (value: string) => void;
  setLink2?: (value: string) => void;
  setSport2?: (value: string) => void;
  setDuration2?: (value: string) => void;
  setStart2?: (value: string) => void;
  setFinish2?: (value: string) => void;
  setFitness2?: (value: string) => void;
  setLocation2?: (value: string) => void;
  setExcerpt2?: (value: string) => void;
  setMinimum2?: (value: number) => void;
  setPrice2?: (value: number) => void;
  setPeeks2?: (value: string) => void;
};

const Details1 = ({ show, set, setLink1, setSport1, setDuration1, setStart1, setFinish1, setFitness1, setLocation1, setExcerpt1, setMinimum1, setPrice1, setPeeks1 }: detailsTypes) => {
  for (const element of set) {
    if (element.name === show) {
      setLink1(element.slug);
      setSport1(element.sport);
      setDuration1(element.duration);
      setStart1(element.start);
      setFinish1(element.finish);
      setFitness1(element.fitness);
      setLocation1(element.branch.name);
      setExcerpt1(element.excerpt);
      setMinimum1(element.minimum);
      setPrice1(element.price);
      setPeeks1(element.peek);
    }
  }
  return null;
};

const Details2 = ({ show, set, setLink2, setSport2, setDuration2, setStart2, setFinish2, setFitness2, setLocation2, setExcerpt2, setMinimum2, setPrice2, setPeeks2 }: detailsTypes) => {

  // console.log(show);
  // console.log(set);

  for (const element of set) {
    if (element.name === show) {
      setLink2(element.slug);
      setSport2(element.sport);
      setDuration2(element.duration);
      setStart2(element.start);
      setFinish2(element.finish);
      setFitness2(element.fitness);
      setLocation2(element.branch.name);
      setExcerpt2(element.excerpt);
      setMinimum2(element.minimum);
      setPrice2(element.price);
      setPeeks2(element.peek);
    }
  }
  return null;
};

const Option = (tours) => {
  if (tours.name === tours.current) {
    return (
      <option selected key={tours.key}>
        {tours.name}
      </option>
    );
  }
  if (tours.name === tours.other) {
    return (
      <option disabled key={tours.key}>
        {tours.name}
      </option>
    );
  }
  return <option key={tours.key}>{tours.name}</option>;
};

const Compare = ({ tours }) => {

  type OptionProps = {
    key: string;
    name: string;
    current: string;
    other: string;
  }

  type Tour = {
    id: string;
    fitness: string;
    slug: string;
    start: string;
    sport: string;
    peek: string;
    price: number;
    name: string;
    minimum: number;
    finish: string;
    excerpt: string;
    duration: string;
    local: {
      name: string;
    };
  }

  type CompareProps = {
    tours: Tour[];
  }

  const first = (e: React.ChangeEvent<HTMLSelectElement>): null => {
    setTour1(e.target.value);
    return null;
  }

  const second = (e: React.ChangeEvent<HTMLSelectElement>): null => {
    setTour2(e.target.value);
    return null;
  }

  // TODO: order by featured
  const [tour1, setTour1] = useState(tours[0].name || "Tour 1");
  const [tour2, setTour2] = useState(tours[1].name || "Tour 2");

  const [link1, setLink1] = useState(tours[0].slug);
  const [link2, setLink2] = useState(tours[1].slug);

  const [sport1, setSport1] = useState(tours[0].sport || "Sport 1");
  const [sport2, setSport2] = useState(tours[1].sport || "Sport 2");

  const [duration1, setDuration1] = useState(tours[0].duration || "Duration 1");
  const [duration2, setDuration2] = useState(tours[1].duration || "Duration 2");

  const [start1, setStart1] = useState(tours[0].start || "Start 1");
  const [start2, setStart2] = useState(tours[1].start || "Start 2");

  const [finish1, setFinish1] = useState(tours[0].finish || "Finish 1");
  const [finish2, setFinish2] = useState(tours[1].finish || "Finish 2");

  const [location1, setLocation1] = useState(tours[0].branch.name || "Location 1");
  const [location2, setLocation2] = useState(tours[1].branch.name || "Location 2");

  const [excerpt1, setExcerpt1] = useState(tours[0].excerpt || "Excerpt 1");
  const [excerpt2, setExcerpt2] = useState(tours[1].excerpt || "Excerpt 2");

  const [minimum1, setMinimum1] = useState(tours[0].minimum || 0);
  const [minimum2, setMinimum2] = useState(tours[1].minimum || 0);

  const [price1, setPrice1] = useState(tours[0].price || 0);
  const [price2, setPrice2] = useState(tours[1].price || 0);

  const [peeks1, setPeeks1] = useState(tours[0].peek);
  const [peeks2, setPeeks2] = useState(tours[1].peek);

  const [fitness1, setFitness1] = useState(tours[0].fitness || "Fitness 1");
  const [fitness2, setFitness2] = useState(tours[1].fitness || "Fitness 2");

  const time1 = PaddleTime({
    start: start1 || tours[0].start,
    finish: finish1 || tours[0].finish
  });
  const time2 = PaddleTime({
    start: start2 || tours[1].start,
    finish: finish2 || tours[1].finish
  });

  return (
    <>
      <div className="comparesheet">
        <div className="comparesheet_titles">
          <div className="comparesheet__transparent">Compare</div>
          <h3 className="kilimanjaro comparesheet_freeze">
            Tour or
            <br />
            Lesson
          </h3>
          <p>Sport</p>
          <p>Time</p>
          <p>Fitness</p>
          <p>Location</p>
          <p>About</p>
          <p>Minimum People</p>
          <p>Price</p>
          <p className="button-drop">Book Now</p>
        </div>

        {/* Tour 1 */}
        <section>
          <select
            name="tour1"
            id="tour1"
            onChange={first}
            className="comparesheet_select"
          >
            {tours.map((tour) => (
              <Option
                key={tour.id}
                name={tour.name}
                current={tour1}
                other={tour2}
              />
            ))}
          </select>
          <h2 className="kilimanjaro">
            <Link to={`/tours-lessons/${link1}`}>{tour1}</Link>
          </h2>
          <Details1
            show={tour1}
            set={tours}
            setLink1={setLink1}
            setSport1={setSport1}
            setDuration1={setDuration1}
            setStart1={setStart1}
            setFinish1={setFinish1}
            setFitness1={setFitness1}
            setLocation1={setLocation1}
            setExcerpt1={setExcerpt1}
            setMinimum1={setMinimum1}
            setPrice1={setPrice1}
            setPeeks1={setPeeks1}
          />
          <h4 className="capitalize">{sport1}</h4>

          {time1.entry}

          <p className="capitalize">
            {fitness1}
            <span className="show-below__vulture">&nbsp;fitness</span>
          </p>
          <p>
            <span className="show-below__vulture">Starts at&nbsp;</span>
            {location1}
          </p>
          <p>{excerpt1}</p>
          <p>
            {minimum1}
            <span className="show-below__vulture">&nbsp;people minimum</span>
          </p>
          <p>${price1}</p>
          <p>
            <a href={peeks1} rel="noopener noreferrer" className="book-now">
              BOOK NOW
            </a>
          </p>
        </section>

        {/* Tour 2 */}
        <section>
          <select
            name="tour2"
            id="tour2"
            onChange={second}
            className="comparesheet_select"
          >
            {tours.map((tour) => (
              <Option
                key={tour.id}
                name={tour.name}
                current={tour2}
                other={tour1}
              />
            ))}
          </select>
          <h2 className="kilimanjaro">
            <Link to={`/tours-lessons/${link2}`}>{tour2}</Link>
          </h2>

          <Details2
            show={tour2}
            set={tours}
            setLink2={setLink2}
            setSport2={setSport2}
            setDuration2={setDuration2}
            setStart2={setStart2}
            setFinish2={setFinish2}
            setFitness2={setFitness2}
            setLocation2={setLocation2}
            setExcerpt2={setExcerpt2}
            setMinimum2={setMinimum2}
            setPrice2={setPrice2}
            setPeeks2={setPeeks2}
          />

          <h4 className="capitalize">{sport2}</h4>

          {/* TODO: should be more like this */}
          {/* <time datetime={time2.entry}>6:00<span className="unit">pm</span> - 8:00<span className="unit">pm</span></time> */}
          {time2.entry}

          <p className="capitalize">
            {fitness2}
            <span className="show-below__vulture">&nbsp;fitness</span>
          </p>
          <p>
            <span className="show-below__vulture">Starts at&nbsp;</span>
            {location2}
          </p>
          <p>{excerpt2}</p>
          <p>
            {minimum2}
            <span className="show-below__vulture">&nbsp;people minimum</span>
          </p>
          <p>${price2}</p>
          <p>
            <a href={peeks2} rel="noopener noreferrer" className="book-now">
              BOOK NOW
            </a>
          </p>
        </section>
      </div >
    </>
  );
}

const ComparePage = () => {
  const { allStrapiTour } = useStaticQuery(graphql`
    query TourCompareQuery {
      allStrapiTour(
        filter: {local: {slug: {eq: "tahoe-city"}}}
        sort: {featured: ASC}
      ) {
        nodes {
          id
          fitness
          slug
          start
          sport
          peek
          price
          name
          minimum
          finish
          excerpt
          duration

          branch {
            name
          }
        }
    }
  }
`);

  return (
    <>
      <Header />

      <main className="pelican">
        <h1>Compare</h1>
        <Compare tours={allStrapiTour.nodes} />
      </main>

      <Breadcrumbs>
        <Breadcrumb>
          <Link to="/tours-lessons/">Tours &amp; Lessons</Link>
        </Breadcrumb>
        <Breadcrumb>Compare</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default ComparePage;

export const Head = () => {
  return (
    <SEO
      title="Compare Tours"
      // TODO description and image
      breadcrumbs={[
        { name: "Tours & Lessons", item: "tours-lessons" },
        { name: "Compare", item: "tours-lessons/compare" },
      ]}
    />
  );
};
