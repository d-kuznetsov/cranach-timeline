import { NextApiRequest, NextApiResponse } from "next";
import items from "../../data/db.json";
export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  res.json(items);
}
