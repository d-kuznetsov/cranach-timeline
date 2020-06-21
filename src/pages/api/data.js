import realGraphics from "../../data/graphics.real.en.json";
import virtualGraphics from "../../data/graphics.virtual.en.json";

export default async function (req, res) {
  const items = [...realGraphics, ...virtualGraphics];
  const sortedItems = items.sort((a, b) => a.dating.begin - b.dating.begin);
  res.json(sortedItems);
}
