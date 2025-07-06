// TODO: move this all to NPM
import * as React from "react"

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: string }) {
  return (
    <div className="breadcrumbs">
      <p>{breadcrumbs}</p>
    </div>
  )
}

type SEOcaseTypes = {
  title: string;
  description: string;
  image: string;
  breadcrumbs?: string;
}
const SEOcase = ({ title, description, image, breadcrumbs }: SEOcaseTypes) => {
  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <section className="SEOcase">
          <p>title = {title}</p>
          <p>description = {description}</p>
          <p>image = {image}</p>

          {breadcrumbs ? (
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          ) : null}
        </section>
      ) : null}
    </>
  )
}

export default SEOcase
