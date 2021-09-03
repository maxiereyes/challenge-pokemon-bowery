import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup.string().min(6).max(12).required("Password is required"),
});

export default schema;
