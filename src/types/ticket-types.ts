import type { IGatsbyImageData } from "gatsby-plugin-image";

export interface TicketTypes {
  id: React.Key;
  ogimage: {
    localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
    alternativeText?: string;
  };
  slug: string;
  name: string;
  start?: string;
  finish?: string;
  duration?: number;
  timeframe?: string;
  fitness?: string;
  excerpt: string;
  price: string;
  peek: string;
}
