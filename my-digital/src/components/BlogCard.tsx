import { Card } from "react-bootstrap";
import styled from "styled-components";
import { IBlogResponse } from "../app/Redux/blogs/blogType";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BlogCard {
  blog: IBlogResponse;
}

const BlogItem = styled(Card)`
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.25s linear;

  overflow: hidden;
  &:hover img {
    transition: all 0.5s ease;
    transform: scale(1.05);
  }
  cursor: pointer;
`;

const Date = styled(Card.Text)`
  font-size: 13px;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 0;
  font-weight: 400;
  color: var(--color-777777);
  padding: 0;
`;

const Title = styled(Card.Title)`
  font-size: 18px;
  color: var(--color-131921);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Description = styled(Card.Text)`
  font-size: 13px;
  line-height: 22px;
  color: var(--color-777777);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CardImg = styled(Card.Img)`
  height: 200px;
  object-fit: cover;
  object-position: center;
`;
export default function BlogCard({ blog }: BlogCard) {
  const navigate = useNavigate();
  return (
    <BlogItem
      onClick={() => navigate(`/blogs/${blog?.id}`)}
      style={{ width: "100%" }}
    >
      <CardImg className="blogCard-img" variant="top" src={blog?.image} />
      <Card.Body>
        <Date>{blog?.createdAt}</Date>
        <Title>{blog?.title}</Title>
        <Description>{blog?.content}</Description>
        <Link
          sx={{
            "&:hover": {
              color: "warning.main",
            },

            "&:active": {
              color: "secondary.main",
            },
          }}
        >
          Click to read more...
        </Link>
      </Card.Body>
    </BlogItem>
  );
}
