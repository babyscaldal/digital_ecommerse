import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import useTitle from "../hooks/useTitle";
import ProductCard from "../components/ProductCard";
import { useAppSelector } from "../app/hooks";
import { favoriteProductsState } from "../app/Redux/products/productSlice";
import NotFound from "../components/NotFound";

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
  padding-bottom: 10px;
`;

export default function FavoriteList() {
  useTitle("Wishlist");

  const favoriteProducts = useAppSelector(favoriteProductsState);

  return (
    <Wrapper>
      <Container fluid="xxl" className="home-wrapper-2">
        {favoriteProducts.length ? (
          <Row className="g-3">
            {favoriteProducts?.map((product, index) => (
              <Col xs={3} key={index}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <NotFound />
        )}
      </Container>
    </Wrapper>
  );
}
