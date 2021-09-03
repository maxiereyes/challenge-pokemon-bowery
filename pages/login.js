import { useRouter } from "next/dist/client/router";
import Container from "../components/Container";
import { useState } from "react";
import CustomError from "../components/Error";
import { signIn } from "next-auth/client";

const Login = () => {
  const router = useRouter();

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setDataLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (error) {
    return <CustomError message={error} />;
  }

  const loginUser = async (e) => {
    e.preventDefault();
    await signIn("login_custom", {
      email: dataLogin.email,
      password: dataLogin.password,
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <Container>
        <h1>Login</h1>
        <form onSubmit={loginUser} className="col-md-4 col">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
