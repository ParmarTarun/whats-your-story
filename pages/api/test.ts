import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
dbConnect();
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json({ test: "It works!" });
};
