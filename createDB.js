const fetch = require("node-fetch");
const fs = require("fs");

async function extractData(categoryCount = 2) {
  const SOURCE_URL =
    "https://lucascranach.github.io/importer/20191122/cda-graphics-v2.real.en.json";
  const res = await fetch(SOURCE_URL);
  const rawData = await res.json();
  const items = rawData.items
    .filter(({ images }) => images)
    .filter(({ dating }) => dating.end >= dating.begin)
    .sort((a, b) => a.dating.begin - b.dating.begin)
    .map((item, index) => {
      const {
        involvedPersons,
        titles,
        objectId,
        dating: { dated, begin, end },
        locations,
        owner,
        images,
      } = item;
      return {
        id: objectId,
        categoryId: index % categoryCount,
        involvedPersons: involvedPersons.map(({ name }) => ({ name })),
        titles: titles.map(({ title }) => ({ title })),
        objectId,
        dating: { dated, begin, end },
        locations: locations.map(({ term }) => ({ term })),
        owner,
        images: {
          sizes: images.sizes,
        },
      };
    });

  fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify({ items }));
}

extractData();
