import bcryptjs from "bcryptjs";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { registerUser } from "../../../utils/validations";
import { NextApiRequest, NextApiResponse } from "next";
dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Page not found" });

  const { email, password, name } = req.body;
  try {
    //already registered?
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res
        .status(400)
        .json({ success: false, message: "Email Id already registered" });

    //validations
    await registerUser.validate({ email, password, name });

    // if (!validationRes)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Email or password is Invalid" });

    //hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const savedUser = await User({ email, password: hashedPassword }).save();
    if (savedUser)
      return res
        .status(200)
        .json({ success: true, message: "Registered Successfully", data: {} });

    return res
      .status(400)
      .json({ success: false, message: "Failed to save user" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
