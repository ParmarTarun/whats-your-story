import dbConnect from "../../../utils/dbConnect";
import Story from "../../../models/Story";
import { NextApiRequest, NextApiResponse } from "next";
dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const stories = await Story.find({ public: true });

        res.status(200).json({ success: true, data: stories });
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
      }
      break;
    
    default:
      res.status(404).json({ success: false });
      break;
  }
};
