import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
dbConnect();
declare const process: {
  env: {
    SECRET_KEY: string;
    MONGO_URI: string;
  };
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(404).json({ success: false });

  const { email, password } = req.body;
  try {
    //user exists?
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res
        .status(400)
        .json({ success: false, message: "No such user, please register" });

    //verify password
    const passwordMatch = await bcryptjs.compare(password, foundUser.password);
    if (!passwordMatch)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect credentials" });

    //generate token
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ success: true, message: `Welcome ${email}`, data: { token } });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
