import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .trim("Please remove whitespace")
    .email("E-mail is not valid!")
    .strict()
    .required("Please enter email"),
  password: Yup.string()
    .trim()
    .trim("Please remove whitespace")
    .strict()
    .required("Please enter password"),
});
