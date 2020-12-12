import dbConnect from "../../../utils/dbConnect";
import Story from "../../../models/Story";
import { NextApiRequest, NextApiResponse } from "next";
import { isTokenValid } from "../../../utils/validations";
dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, headers } = req;
  const writer = isTokenValid(headers);
  if (!writer)
    return res.status(400).json({ success: false, message: "Invalid token" });
  switch (method) {
    case "GET":
      try {
        const stories = await Story.find({ writer });
        res.status(200).json({ success: true, data: stories });
      } catch (e) {
        res.status(500).json({ success: false, message: e.message });
      }
      break;

    default:
      res.status(404).json({ success: false });
      break;
  }
};
