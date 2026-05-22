import type { PaddleCardTypes } from "@rileybathurst/paddle";

export type TeamCardTypes = Omit<PaddleCardTypes, "link"> & {
  slug: string;
};
