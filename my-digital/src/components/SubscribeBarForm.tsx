import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import CustomSubscribeField from "./CustomSubscribeField";
import { useAppDispatch } from "../app/hooks";
import { postSubscribeEmailInfo } from "../app/Redux/contacts/contactSlice";

const subscribeValueSchema = z.object({
  subscribe: z
    .string()
    .email("Invalid email")
    .min(1, { message: "Email is required" }),
});

interface ISubscribeFormValue {
  subscribe: string;
}

export default function SubscribeBarForm() {
  const dispatch = useAppDispatch();

  const form = useForm<ISubscribeFormValue>({
    defaultValues: { subscribe: "" },
    resolver: zodResolver(subscribeValueSchema),
    mode: "all",
  });

  const { handleSubmit, reset } = form;

  const onSubmit = (data: ISubscribeFormValue) => {
    console.log(data);
    dispatch(postSubscribeEmailInfo(data));
    reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomSubscribeField
          placeholder="Your Email Address"
          id="subscribe"
          name={"subscribe"}
          type="email"
        >
          <AddAlertIcon />
        </CustomSubscribeField>
      </form>
    </FormProvider>
  );
}
