import type { PaddleCardTypes } from "@rileybathurst/paddle";

export type RetailCardTypes = PaddleCardTypes & {
  slug: string;
  sport: {
    slug: string;
  };
  brand: {
    id: React.Key;
    slug: string;
  };
};
