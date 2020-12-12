import dbConnect from "../../../utils/dbConnect";
import Story from "../../../models/Story";
import { NextApiRequest, NextApiResponse } from "next";
import { isTokenValid } from "../../../utils/validations";
dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
    headers,
    body,
  } = req;
  let writer;

  switch (method) {
    case "GET":
      try {
        const story = await Story.findById(id);

        if (!story) return res.status(400).json({ success: false });
        if (!story.public) {
          //story is private and can only be seen by followers or user himself
          if (story.writer.toString() !== isTokenValid(headers))
            return res.status(401).json({ success: false });
        }

        return res.status(200).json({ success: true, data: story });
      } catch (e) {
        return res.status(400).json({ success: false });
      }

    case "POST":
      let newStory = { ...body, writer };
      try {
        const story = await Story.create(newStory);

        return res.status(201).json({ success: true, data: story });
      } catch (e) {
        //uniqueness
        if (e.code === 11000)
          return res
            .status(400)
            .json({ success: false, message: "Please provide a unique title" });
        else
          return res.status(400).json({ success: false, message: e.message });
      }
      break;

    case "PUT":
      try {
        const storyToUpdate = await Story.findById(id);
        if (!storyToUpdate)
          return res
            .status(400)
            .json({ success: false, message: "Invalid story" });
        if (storyToUpdate.writer.toString() !== writer)
          return res
            .status(400)
            .json({ success: false, message: "Invalid user" });

        const story = await Story.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        return res.status(200).json({ success: true, data: story });
      } catch (e) {
        //uniqueness
        if (e.code === 11000)
          return res
            .status(400)
            .json({ success: false, message: "Please provide a unique title" });
        else
          return res.status(400).json({ success: false, message: e.message });
      }

    case "DELETE":
      try {
        const storyToDelete = await Story.findById(id);
        if (!storyToDelete)
          return res
            .status(400)
            .json({ success: false, message: "Invalid story" });
        if (storyToDelete.writer.toString() !== writer)
          return res
            .status(400)
            .json({ success: false, message: "Invalid user" });
        await Story.deleteOne({ _id: id });

        return res.status(200).json({ success: true, data: {} });
      } catch (e) {
        return res.status(400).json({ success: false });
      }

    default:
      break;
  }
};
