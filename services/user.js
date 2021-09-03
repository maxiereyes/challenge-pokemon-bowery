import { reqresApi } from "../config/axios.config";

export const postLogin = async ({ email, password }) => {
  const payload = {
    email,
    password,
  };
  return await reqresApi.post("/login", payload);
};
