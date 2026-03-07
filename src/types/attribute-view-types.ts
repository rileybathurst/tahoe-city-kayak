// * SEO isnt here its on the templates
import type { PaddlePurchaseTypes } from "@rileybathurst/paddle";

export type AttributeViewTypes = {
  allStrapiRetail: {
    title: string;
    description: string;
    nodes: PaddlePurchaseTypes[];
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
}