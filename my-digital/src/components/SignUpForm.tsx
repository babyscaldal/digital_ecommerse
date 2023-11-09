import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "./CustomTextField";
import PasswordField from "./PasswordField";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  isLoginState,
  registerUser,
  saveUserToClient,
} from "../app/Redux/users/userSlice";
import { useEffect } from "react";

export interface IRegisterFormValue {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

export type IRegisterInfoData = Omit<IRegisterFormValue, "confirmPassword">;

const signUpValueSchema = z
  .object({
    email: z.string().email().min(1, { message: "Email is required" }),
    username: z.string().min(1, { message: "User name is required" }),
    password: z
      .string()
      .min(8, { message: "The password must be least 8 characters long." }),
    confirmPassword: z
      .string()
      .min(8, { message: "The password must be at least 8 characters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords and Confirm Password does not match.",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<IRegisterFormValue>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpValueSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = form;

  const isLogin = useAppSelector(isLoginState);

  const onSubmit = (data: IRegisterFormValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...others } = data;
    const registerInfoData: IRegisterInfoData = { ...others };
    const registerRequestData = { user: { ...registerInfoData } };
    dispatch(registerUser(registerRequestData));
    dispatch(saveUserToClient(registerInfoData));
    navigate("/", { replace: true });
    reset();
  };

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
        <CustomTextField
          label="User Name"
          placeholder="User Name"
          type="text"
          id={"signUp-userName"}
          name="username"
        />
        <CustomTextField
          label="Email"
          placeholder="Email"
          type="email"
          id={"signUp-email"}
          name="email"
        />
        <PasswordField
          label="Password"
          placeholder="Password"
          id="signUp-password"
          name="password"
        />
        <PasswordField
          label="Confirm Password"
          placeholder="Confirm Password"
          id="signUp-confirmPassword"
          name="confirmPassword"
        />
        <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
          <Button fullWidth type="submit" variant="contained" color="success">
            Register
          </Button>
          <Button
            fullWidth
            onClick={() => {
              navigate("/login");
            }}
            type="button"
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
