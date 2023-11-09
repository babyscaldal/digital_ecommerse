import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordField from "./PasswordField";
import EmailField from "./CustomTextField";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isLoginState, loginUser } from "../app/Redux/users/userSlice";
import { useEffect } from "react";

export type ILoginFormValue = {
  email: string;
  password: string;
};

const loginValueSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "The password must be least 8 characters long." }),
});

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const form = useForm<ILoginFormValue>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginValueSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const { handleSubmit, reset } = form;

  const onSubmit = (data: ILoginFormValue) => {
    console.log(data);
    const loginInfoData = { ...data };
    const loginRequestData = { user: { ...loginInfoData } };
    dispatch(loginUser(loginRequestData));
    navigate("/", { replace: true });
    reset();
  };

  const isLogin = useAppSelector(isLoginState);

  useEffect(() => {
    if (isLogin) {
      navigate("/", { replace: true });
    }
  }, [isLogin]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-15"
      >
        <EmailField
          label="Email"
          placeholder="Email"
          id={"login-email"}
          type="Email"
          name="email"
        />
        <PasswordField
          label="Password"
          placeholder="Password"
          id="login-password"
          name="password"
        />
        <div className="d-flex justify-content-between align-items-center">
          <NavLink
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "blue",
            }}
            to="/forgot-password"
          >
            Forgot Password?
          </NavLink>
        </div>
        <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
          <Button type="submit" variant="contained" color="success" fullWidth>
            Log In
          </Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            fullWidth
            type="button"
            variant="contained"
            color="warning"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
