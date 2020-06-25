export function getArtworkTitle({ titles }) {
  return titles
    .map((item) => item.title)
    .join(", ")
    .split("(")[0];
}

export function getInvolvedPersons({ involvedPersons }) {
  return involvedPersons.map((item) => item.name).join(", ");
}

export function getImageSrc({ images }, size = "s") {
  return images.sizes[size].src;
}

export function getPeriod({ dating }) {
  const { dated, begin, end } = dating;
  if (begin && end && begin < end) {
    return `${begin}-${end}`;
  }
  return dated;
}

export function getDimensions(data, size = "s") {
  return data.images.sizes[size].dimensions;
}

export function isLandscape(data) {
  const { height, width } = data.images.sizes.xs.dimensions;
  return width > height;
}
