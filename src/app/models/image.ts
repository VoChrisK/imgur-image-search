import { Tag } from "./tag";

export interface Image {
  images: Array<Image>;
  link: string;
  tags: Array<Tag>;
  title: string;
  type: string;
}

export type FilteredImages = Array<Image> | null;