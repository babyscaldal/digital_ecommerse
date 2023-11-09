import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import images from "../Image/images";
import { useAppSelector } from "../app/hooks";
import { cartProductsState } from "../app/Redux/products/productSlice";
import CheckoutTable from "../components/CheckoutTable";
import PayPalCheckoutButton from "../components/PayPalCheckoutButton";

const HeaderUpperContainer = styled.div`
  background: var(--color-131921);
`;
const NavItemWrapper = styled.div`
  &:hover svg {
    transform: rotateY(360deg);
    transition: all 1s linear;
  }
`;
const SubtotalWrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h5 {
    margin: 0;
    padding: 0 20px;
  }
`;

const Checkout = () => {
  const cartProducts = useAppSelector(cartProductsState);

  const totalPrice = cartProducts.reduce((acc, item) => {
    return acc + (item.totalPrice ?? 0);
  }, 0);
  return (
    <>
      <HeaderUpperContainer>
        <Container fluid="xl">
          <Row
            className="align-items-center justify-content-around"
            style={{ height: "60px" }}
          >
            <Col xs={3}>
              <h2 className="m-0">
                <NavLink className="text-white" to="/">
                  DIGITAL ZONE
                </NavLink>
              </h2>
            </Col>
            <Col xs={8}>
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-30">
                <NavItemWrapper>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        fontSize: isActive ? "16px" : "14px",
                        fontWeight: isActive ? "bolder" : "",
                        color: isActive
                          ? "var(--color-febd69)"
                          : "var(--color-ededed)",
                      };
                    }}
                    to="/cart"
                    className="d-flex align-items-center gap-10"
                  >
                    <Badge badgeContent={cartProducts?.length} color="warning">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </NavLink>
                </NavItemWrapper>
              </div>
            </Col>
          </Row>
        </Container>
      </HeaderUpperContainer>

      <Container fluid="xl">
        <Row
          className="justify-content-center"
          style={{ height: "calc(100vh - 75px)" }}
        >
          <Col xs={12}>
            <h2 className="text-uppercase text-center my-3">
              Check out your order
            </h2>
          </Col>
          <Col xs={12}>
            <Row className="g-3 align-items-center">
              <Col xs={6}>
                <img
                  width="100%"
                  height="246px"
                  src={images.payment}
                  alt="payment"
                  className="object-fit-contain"
                />
              </Col>
              <Col xs={6}>
                <Row className="g-3">
                  <Col xs={12}>
                    <CheckoutTable />
                  </Col>
                  <Col xs={12}>
                    <SubtotalWrapper>
                      <h5 className="text-dark">Subtotal:</h5>
                      <h5 className="text-success">${totalPrice}</h5>
                    </SubtotalWrapper>
                  </Col>
                  <Col xs={12}>
                    <PayPalCheckoutButton totalPrice={totalPrice} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
