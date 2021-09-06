import { Container } from "../components/Container";
import { useState } from "react";
import { signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import schemaForm from "../schema/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorCustom from "../components/InputErrorCustom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
  });

  const [error, setError] = useState("");

  const loginUser = async (data) => {
    await signIn("login_custom", {
      ...data,
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <Container>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(loginUser)} className="col-md-4 col">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <InputErrorCustom isValid={false} text={errors.email.message} />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <InputErrorCustom
                isValid={false}
                text={errors.password.message}
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
