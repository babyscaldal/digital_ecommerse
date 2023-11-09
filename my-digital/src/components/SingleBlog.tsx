import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "../app/hooks";
import { allBlogState } from "../app/Redux/blogs/blogSlice";

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`;

const SingleBlog = () => {
  const allBlogs = useAppSelector(allBlogState);
  const params = useParams();
  const currentBlog = allBlogs?.find((item) => item?.id === Number(params?.id));
  return (
    <Wrapper>
      <Container fluid={"xl"} className="blog-wrapper home-wrapper-2">
        <h2 className="title text-center mb-3">{currentBlog?.title}</h2>
        <Row>
          <Col xs={12}>
            <Row className="g-3">
              <Col xs={12}>
                <div style={{ width: "100%", height: "500px" }}>
                  <img
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                    src={currentBlog?.image}
                    alt="blog"
                  />
                </div>
              </Col>
              <Col xs={12}>
                <p style={{ textIndent: "20px" }}>{currentBlog?.content}</p>
              </Col>
            </Row>
            <NavLink
              to="/blogs"
              className="d-flex align-items-center gap-10 my-3"
            >
              <ArrowBackIcon /> Go back to Blogs
            </NavLink>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default SingleBlog;
