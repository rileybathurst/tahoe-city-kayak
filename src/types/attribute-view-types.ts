// * SEO isnt here its on the templates
import type { PaddleCardTypes } from "@rileybathurst/paddle";

export type AttributeViewTypes = {
  allStrapiRetail: {
    title: string;
    description: string;
    nodes: PaddleCardTypes[];
  };
  strapiAttribute: {
    name: string;
    type?: string;
    description: {
      data: {
        description: string;
      };
    };
  };
};
