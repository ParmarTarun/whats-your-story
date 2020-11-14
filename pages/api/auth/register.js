import bcryptjs from "bcryptjs";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { userSchema } from "../../../utils/validations";
dbConnect();

export default async (req, res) => {
  if (req.method !== "POST")
    return res.status(404).json({ message: "Page not found" });

  const { email, password } = req.body;
  try {
    //already registered?
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res
        .status(400)
        .json({ success: false, message: "Email Id already registered" });

    //validations
    const validationRes = await userSchema.validate({ email, password });

    if (!validationRes)
      return res
        .status(400)
        .json({ success: false, message: "Email or password is Invalid" });

    //hashing password
    const salt =await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const savedUser = await User({ email, password: hashedPassword }).save();
    if (savedUser)
      return res
        .status(200)
        .json({ success: true, message: "Registered Successfully" });

    return res.status(400).json({ success: false, message: e.message });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
