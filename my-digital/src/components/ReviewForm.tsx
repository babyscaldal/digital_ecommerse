import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextAreaField from "./CustomTextAreaField";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { currentUserState } from "../app/Redux/users/userSlice";
import {
  postCommentsSingleProduct,
  selectedProductState,
} from "../app/Redux/products/productSlice";
import { IComments } from "../app/Redux/products/productType";
import CustomRate from "./CustomRate";

const reviewFormValueSchema = z.object({
  comments: z.string().min(1, { message: "Comments is required" }),
  rate: z.string().min(1, { message: "Rate is required" }),
});

interface ReviewFormValue {
  comments: string;
  rate: string;
}

export default function ReviewForm() {
  const dispatch = useAppDispatch();
  const form = useForm<ReviewFormValue>({
    defaultValues: { comments: "", rate: "0" },
    resolver: zodResolver(reviewFormValueSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = form;

  const currentUser = useAppSelector(currentUserState);
  const selectedProduct = useAppSelector(selectedProductState);

  const onSubmit = (data: ReviewFormValue) => {
    let commentData: IComments;
    if (currentUser && selectedProduct) {
      commentData = {
        productId: selectedProduct.id,
        content: data.comments,
        rate: data.rate,
        username: currentUser.user.username,
      };
      dispatch(postCommentsSingleProduct(commentData));
    }
    console.log(data);
    reset();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-15"
      >
        <div>
          <CustomRate name="rate" />
          {/* <Rating
            size="small"
            name="simple-controlled"
            value={rate}
            onChange={(_, newValue) => {
              setRate(newValue);
            }}
          /> */}
        </div>
        <div>
          <CustomTextAreaField
            placeholder="Comments"
            label="Comments"
            id="review-form-comments"
            name="comments"
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="button border-0">
            Submit Review
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
