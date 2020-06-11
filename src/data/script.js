const fetch = require("node-fetch");
const fs = require("fs");

const REAL_GRAPHICS_URL =
  "https://lucascranach.github.io/importer/20191122/cda-graphics-v2.real.en.json";
const VIRTUAL_GRAPHICS_URL =
  "https://lucascranach.github.io/importer/20191122/cda-graphics-v2.virtual.en.json";

async function extractData(url, categoryId, filenameToSave) {
  const res = await fetch(url);
  const rawData = await res.json();
  const items = rawData.items
    .filter(({ images }) => images)
    .map((item) => {
      const {
        langCode,
        involvedPersons,
        titles,
        objectId,
        inventoryNumber,
        dating: { dated, begin, end },
        description,
        locations,
        owner,
        images,
      } = item;
      return {
        categoryId,
        langCode,
        involvedPersons: involvedPersons.map(({ name }) => ({ name })),
        titles: titles.map(({ title }) => ({ title })),
        objectId,
        inventoryNumber,
        dating: { dated, begin, end },
        description,
        locations: locations.map(({ term }) => ({ term })),
        owner,
        images: {
          sizes: images.sizes,
        },
      };
    });
  fs.writeFileSync(`${__dirname}/${filenameToSave}.json`, JSON.stringify(items));
}

extractData(REAL_GRAPHICS_URL, 1, "graphics.real.en");
extractData(VIRTUAL_GRAPHICS_URL, 2, "graphics.virtual.en");
