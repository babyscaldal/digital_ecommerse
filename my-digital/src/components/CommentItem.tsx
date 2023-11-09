import { Rating, capitalize } from "@mui/material";
import styled from "styled-components";
import { IComments } from "../app/Redux/products/productType";
import dayjs from "dayjs";

const ReviewBox = styled.div`
  /* &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  } */
`;

const ReviewContent = styled.p`
  font-size: 14px;
  color: var(--color-777777);
`;

interface ICommentItem {
  comment: IComments;
}

export default function CommentItem({ comment }: ICommentItem) {
  const milliseconds = comment?.createdAt;

  const date = dayjs(milliseconds).format("DD/MM/YYYY HH:mm:ss");

  return (
    <ReviewBox className="review">
      <div className="d-flex gap-10  flex-column">
        <div className="d-flex gap-10 align-items-center">
          <h6 className="mb-0">{capitalize(comment?.username)}</h6>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-777777)",
            }}
            className="mb-0"
          >
            {date}
          </p>
        </div>
        <Rating
          readOnly
          size="small"
          name="simple-controlled"
          value={Number(comment?.rate)}
        />
      </div>
      <ReviewContent className="mt-3">{comment.content}</ReviewContent>
    </ReviewBox>
  );
}
