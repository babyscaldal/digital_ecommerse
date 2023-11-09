import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "react-bootstrap"
import CustomTextAreaField from "./CustomTextAreaField"
import CustomTextField from "./CustomTextField"
import { useAppDispatch } from "../app/hooks"
import { postContactInfo } from "../app/Redux/contacts/contactSlice"

const phoneNumberRegex = /^\d{10}$/

interface IContactFormValue {
  name: string
  email: string
  tel: string
  comments: string
}

export const contactFormValueSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email("Invalid email")
    .min(1, { message: "Email is required" }),
  comments: z.string().min(1, { message: "Comments is required" }),
  tel: z.string().refine((value) => phoneNumberRegex.test(value), {
    message: "Invalid phone number",
  }),
})

export default function ContactForm() {
  const form = useForm<IContactFormValue>({
    defaultValues: { name: "", email: "", tel: "", comments: "" },
    resolver: zodResolver(contactFormValueSchema),
    mode: "onSubmit",
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  const dispatch = useAppDispatch()

  const onSubmit = (data: IContactFormValue) => {
    console.log(data)
    dispatch(postContactInfo(data))
    reset()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column gap-15">
          <CustomTextField
            placeholder="Name"
            label="Name"
            id="contact-form-name"
            name={"name"}
            type="text"
          />
          <CustomTextField
            placeholder="Email"
            label="Email"
            id="contact-form-email"
            name={"email"}
            type="email"
          />
          <CustomTextField
            placeholder="tel"
            label="Tel"
            id="contact-form-tel"
            name={"tel"}
            type="tel"
          />
          <CustomTextAreaField
            placeholder="Comments"
            label="Comments"
            id="contact-form-comments"
            name={"comments"}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className="button border-0"
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
