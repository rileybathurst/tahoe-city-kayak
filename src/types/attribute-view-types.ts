// * SEO isnt here its on the templates
import type { RetailCardTypes } from "./retail-card-types";

export type AttributeViewTypes = {
  allStrapiRetail: {
    title: string;
    description: string;
    nodes: RetailCardTypes[];
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
