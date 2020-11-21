import * as yup from "yup";
import jwt from "jsonwebtoken";

export const registerUser = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Please create a password according to mentioned guidlines"
    )
    .required(),
  email: yup.string().email().required(),
  name: yup.string().max(15, "Title too big").required(),
});

export const noEmpty = (data: any) => {
  let allOk = true;
  Object.keys(data).forEach((key) => {
    if (data[key] === "") allOk = false;
  });
  return allOk;
};
declare const process: {
  env: {
    SECRET_KEY: string;
    MONGO_URI: string;
  };
};
export const isTokenValid = (headers: any): any => {
  if (!headers.authorization) return null;
  const token = <string>headers.authorization?.split(" ")[1];
  try {
    const { userId } = <any>jwt.verify(token, process.env.SECRET_KEY);
    return userId;
  } catch (e) {
    return null;
  }
};
