import type { PaddleCardTypes } from "@rileybathurst/paddle";

export type TourCardTypes = PaddleCardTypes & {
  slug: string;
  peek: string;
};
