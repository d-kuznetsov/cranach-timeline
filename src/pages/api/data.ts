import { NextApiRequest, NextApiResponse } from "next";
import realGraphics from "../../data/graphics.real.en.json";
import virtualGraphics from "../../data/graphics.virtual.en.json";

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const items = [...realGraphics, ...virtualGraphics];
  const sortedItems = items.sort((a, b) => a.dating.begin - b.dating.begin);
  res.json(sortedItems);
}
