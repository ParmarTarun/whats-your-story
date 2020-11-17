import * as yup from "yup";

export const registerUser = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Please create a password according to mentioned guidlines"
    )
    .required(),
  email: yup.string().email().required(),
  name: yup.string().max(15).required(),
});

export const noEmpty = (data) => {
  let allOk = true;
  Object.keys(data).forEach((key) => {
    if (data[key] === "") allOk = false;
  });
  return allOk;
};
