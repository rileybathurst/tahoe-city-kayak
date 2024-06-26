import type { IGatsbyImageData } from "gatsby-plugin-image";

// ! this is tours and not retail
export interface CardType {
  id: React.Key;
  name: string;
  slug: string;
  price: number;
  excerpt: string;
  start?: Date;
  end?: Date;
  duration?: number;
  peek: string;
  iogimage: {
    localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
    alternativeText: string;
  };
}
