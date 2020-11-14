import * as yup from "yup";

export const userSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain atleast one uppercase, one numeric and one symbol."
    )
    .required(),
  email: yup.string().email().required(),
});
