import dbConnect from "../../../utils/dbConnect";
import Story from "../../../models/Story";
import { NextApiRequest, NextApiResponse } from "next";
dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const story = await Story.findById(id);

        if (!story) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, data: story });
      } catch (e) {
        res.status(400).json({ success: false });
      }

      break;

    case "POST":
      try {
        const story = await Story.create(req.body);

        res.status(201).json({ success: true, data: story });
      } catch (e) {
        //uniqueness
        if (e.code === 11000)
          res
            .status(400)
            .json({ success: false, message: "Please provide a unique title" });
        else res.status(400).json({ success: false, message: e.message });
      }
      break;

    case "PUT":
      try {
        const story = await Story.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!story) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, data: story });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const story = await Story.deleteOne({ _id: id });

        if (!story) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, data: {} });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      break;
  }
};
