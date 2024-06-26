// ! hard coded for right now

import * as React from "react"
import { Link } from 'gatsby';
import Markdown from "react-markdown";
import HourMin from "./hour-min";

interface DangerSVGTypes {
  svg: string;
}
function DangerSVG({ svg }: DangerSVGTypes) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      className="svg"
    />
  )
}

interface SeasonTypes {
  season_start: string;
  season_end: string;
  opening_time: string;
  closing_time: string;
  name: string;
}
function Season({ season_start, season_end, opening_time, closing_time, name }: SeasonTypes) {

  // TODO: test faking the date
  // use faker upcoming and past dates

  // console.log(season_start, season_end, opening_time, closing_time, name);
  // console.log(new Date(season_start), new Date());
  // console.log(new Date());
  // console.log(season_start <= new Date());

  // console.log(season_start);

  /*   if (name === "Free Parking Lot") {
      return null;
    } else {
      return (
        <p>
          {opening_time ? "Open Daily: " : null}<br />
          <HourMin time={opening_time} />
          {opening_time ? " - : " : null}
          <HourMin time={closing_time} />
        </p>
      )
    } */

  /*   } else if (season_start <= new Date()) {
    return (
      <p>
        {opening_time ? "Open Daily: " : null}<br />
        <HourMin time={opening_time} />
        {opening_time ? " - : " : null}
        <HourMin time={closing_time} />
      </p>
    )
  } else {
    return (
      <p>
        We&apos;re closed for the season:<br />
        We will reopen<br />
        {season_start} - {season_end}<br />
        Weather Permitting
      </p>
    )
  } */

  if (name === "Free Parking Lot") {
    return null;
  }

  // console.log(opening_time, closing_time);

  return (
    <p>
      Open Daily<br />
      <HourMin time={opening_time} /> - <HourMin time={closing_time} /><br />
      Weather Permitting
    </p>
  )

}

interface ContentTypes {
  location: {
    svg: string;
    name: string;
    address: {
      data: {
        address: string;
      }
    };
    description: {
      data: {
        description: string;
      }
    };
    opening_time: string;
    closing_time: string;

    locale: {
      season_start: string;
      season_end: string;
    };
  };
}
function Content({ location }: ContentTypes) {
  return (
    <>
      <DangerSVG svg={location.svg} />

      <div>
        <h3 className="elbrus">{location.name}</h3>
        <Markdown
          children={location.address.data.address}
          className="react-markdown"
        />
      </div>

      <div>
        <Season
          season_start={location.locale.season_start}
          season_end={location.locale.season_end}
          opening_time={location.opening_time}
          closing_time={location.closing_time}
          name={location.name}
        />
        <br />
        <Markdown
          children={location.description.data.description}
          className="react-markdown"
        />
      </div>
    </>
  )
}

interface LocationCardTypes {
  location: {
    id: string;
    link: string;
    svg: string;
    name: string;
    address: {
      data: {
        address: string;
      }
    };
    description: {
      data: {
        description: string;
      }
    };
    opening_time: string;
    closing_time: string;

    locale: {
      season_start: string;
      season_end: string;
    };
  };
  background?: boolean;
}

function LocationCard({ location, background }: LocationCardTypes) {

  // console.log(location);

  if (location.link.includes('http')) {
    return (
      <a href={location.link}
        key={location.id}
        className={`location ${background}`}
        target="_blank"
        rel="noopener noreferrer"
        title={location.name}
      >
        <Content location={location} />
      </a>
    )
  }
  return (
    <Link
      key={location.id}
      to={`/${location.link}`}
      className={`location ${background}`}
    >
      <Content location={location} />
    </Link>
  )
}

export default LocationCard