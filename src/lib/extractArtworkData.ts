import { Artwork, ImageSize } from "../redux/types";

export function getArtworkTitle({ titles }: Artwork): string {
  return titles
    .map((item) => item.title)
    .join(", ")
    .split("(")[0];
}

export function getInvolvedPersons({ involvedPersons }: Artwork): string {
  //return involvedPersons.map((item) => item.name).join(", ");
  return involvedPersons[0]?.name || '';
}

export function getImageSrc({ images }: Artwork, size: ImageSize = "s"): string {
  return images.sizes[size].src;
}

export function getPeriod({ dating }: Artwork): string {
  const { dated, begin, end } = dating;
  if (begin && end && begin < end) {
    return `${begin}-${end}`;
  }
  return dated;
}

export function getDimensions(data: Artwork, size: ImageSize = "s") {
  return data.images.sizes[size].dimensions;
}

export function isLandscape(data: Artwork): boolean {
  const { height, width } = data.images.sizes.xs.dimensions;
  return width > height;
}
