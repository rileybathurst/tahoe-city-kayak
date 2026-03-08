import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";

export interface RetailType {
  id: React.Key;
  title: string;
  brand: {
    name: string;
    slug: string;
    svg: string;
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
  crew: number;
  hullweight: number;
  riggedweight: number;
  thickness: number;
  // volume?: number;

  inflatable: boolean;
  demo: boolean;

  // discount?: number; currently unused so has to be removed from query
  length: number;
  width: number;
  capacity: number;
  cutout: PaddleGatsbyImageType;
  features: {
    data: {
      features: string;
    };
  };
  description: {
    data: {
      description: string;
    };
  };
  series: string;
}
