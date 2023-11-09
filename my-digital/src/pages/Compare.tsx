import styled from "styled-components"
import { Container, Row } from "react-bootstrap"

import useTitle from "../hooks/useTitle"
import { useAppSelector } from "../app/hooks"
import { compareProductsState } from "../app/Redux/products/productSlice"
import CompareItem from "../components/CompareItem"
import NotFound from "../components/NotFound"

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`

export default function Compare() {
  useTitle("Compare Product")

  const compareProducts = useAppSelector(compareProductsState)

  return (
    <Wrapper>
      <Container fluid={"xxl"} className="home-wrapper-2">
        {compareProducts?.length ? (
          <Row className="g-3 pb-3">
            {compareProducts?.map((product) => (
              <CompareItem product={product} key={product?.id} />
            ))}
          </Row>
        ) : (
          <NotFound />
        )}
      </Container>
    </Wrapper>
  )
}
