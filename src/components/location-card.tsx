import * as React from "react"
import { Link } from 'gatsby';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

function DangerSVG({ svg }: { svg: string }) {

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      className="svg"
    />
  )
}

function Content({ location }) {
  return (
    <>
      <DangerSVG svg={location.svg} />
      <div>
        <h3 className="elbrus">{location.name}</h3>
        <ReactMarkdown
          children={location.address.data.address}
          remarkPlugins={[remarkGfm]}
        />
      </div>

      <ReactMarkdown
        children={location.description.data.description}
        remarkPlugins={[remarkGfm]}
      />
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
  };
  background?: boolean;
}

function LocationCard({ location, background }: LocationCardTypes) {

  if (location.link === "https://") {
    return (
      <a href={location.link}
        key={location.id}
        className={`location ${background}`}
      >
        <Content location={location} />
      </a>
    )
  } else {
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
}

export default LocationCard