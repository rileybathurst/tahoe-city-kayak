import type { IGatsbyImageData } from "gatsby-plugin-image";

export interface RetailType {
  id: React.Key;
  title: string;
  brand: {
    slug: string;
  };
  slug: string;
  price: number;
  excerpt: string;
  start?: Date;
  end?: Date;
  duration?: number;
  peek: string;
  sport: {
    slug: string;
  };
  inflatable: boolean;
  demo: boolean;
  discount: number;
  length: number;
  width: number;
  capacity: number;
  cutout: {
    localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
    alternativeText: string;
  };
}
