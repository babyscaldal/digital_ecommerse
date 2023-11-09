import styled from "styled-components"
import useTitle from "../hooks/useTitle"
import { Col, Container, Row } from "react-bootstrap"
import CartTable from "../components/CartTable"
import CartPayment from "../components/CartPayment"
import { cartProductsState } from "../app/Redux/products/productSlice"
import { useAppSelector } from "../app/hooks"
import NotFound from "../components/NotFound"

const Wrapper = styled.section`
  padding-top: 150px;
  background-color: var(--color-f5f5f7);
`

const StickyParent = styled.div`
  position: relative;
`
const StickyChild = styled.div`
  position: sticky;
  top: 200px;
`

export default function Cart() {
  useTitle("Cart")

  const cartProducts = useAppSelector(cartProductsState)

  return (
    <Wrapper>
      <Container fluid="xxl" className="cart-wrapper home-wrapper-2">
        {cartProducts?.length ? (
          <Row className="g-3">
            <Col xs={9}>
              <StickyParent>
                <StickyChild>
                  <CartTable />
                </StickyChild>
              </StickyParent>
            </Col>
            <Col xs={2} className="flex-grow-1">
              <CartPayment />
            </Col>
          </Row>
        ) : (
          <NotFound />
        )}
      </Container>
    </Wrapper>
  )
}
