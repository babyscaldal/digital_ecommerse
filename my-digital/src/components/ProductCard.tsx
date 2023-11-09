import { Card, Col, Container, Row } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import styled, { keyframes } from "styled-components";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Checkbox, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { NavLink } from "react-router-dom";
import { IProductResponse } from "../app/Redux/products/productType";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Tippy from "@tippyjs/react";

import CheckIcon from "@mui/icons-material/Check";
import CompareIcon from "@mui/icons-material/Compare";
import {
  addProductsToCartList,
  addProductsToCompareList,
  addProductsToFavoriteList,
  compareProductsState,
  favoriteProductsState,
  getCommentsSingleProduct,
  getSelectedProduct,
  removeProductsFromCompareList,
  removeProductsFromFavoriteList,
} from "../app/Redux/products/productSlice";

interface IProductCard {
  product: IProductResponse;
  grid?: number;
}

const ActionBar = styled.div`
  top: 5px;
  right: -30px;
  transition: all 0.3s;
`;
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const ProductItem = styled(Card)`
  width: 100%;
  box-shadow: 0 0 10px #0000001a;
  overflow: hidden;
  transition: all 0.25s linear;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }

  &:hover ${ActionBar} {
    animation: ${slideIn} 0.3s forwards linear;
    right: 5px;
  }

  &:hover img {
    transition: all 0.25s ease;
    transform: scale(1.2);
  }
`;

const Category = styled(Card.Text)`
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--color-bf4800);
`;

const Title = styled(Card.Title)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
  font-size: 16px;
  color: var(--color-131921);
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Price = styled(Card.Text)`
  font-weight: bold;
  font-size: 16px;
  color: var(--color-1c1b1b);
  margin-top: 8px;
`;

const Detail = styled(Card.Text)`
  color: var(--color-777777);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  line-height: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const WishListIcon = styled.div`
  top: 5px;
  left: 5px;
`;

export default function ProductCard({ product, grid }: IProductCard) {
  const dispatch = useAppDispatch();

  const favoriteProducts = useAppSelector(favoriteProductsState);
  const compareProducts = useAppSelector(compareProductsState);
  const isFavorite = favoriteProducts.some((item) => item.id === product.id);
  const isComparing = compareProducts.some((item) => item.id === product.id);

  return (
    <NavLink to={`/products/${product?.category}/${product?.id}`}>
      <ProductItem
        onClick={() => {
          dispatch(getSelectedProduct(product));
          dispatch(getCommentsSingleProduct(product.id));
        }}
        className="position-relative"
      >
        <WishListIcon className="position-absolute z-1">
          <Tippy
            content={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Checkbox
              onChange={() => {
                if (isFavorite === false) {
                  dispatch(addProductsToFavoriteList(product));
                } else {
                  dispatch(removeProductsFromFavoriteList(product));
                }
              }}
              checked={isFavorite}
              onClick={(e) => {
                e.stopPropagation();
              }}
              icon={<FavoriteBorder color="warning" />}
              checkedIcon={<Favorite color="error" />}
            />
          </Tippy>
        </WishListIcon>
        <Card>
          <Container>
            <Row>
              <Col xs={grid !== 12 ? 12 : 3}>
                <div className="d-flex justify-content-center align-items-center">
                  <Card.Img
                    style={{
                      padding: "25px",
                      objectFit: "cover",
                      width: "225px",
                      height: "225px  ",
                    }}
                    src={product?.image}
                  />
                </div>
              </Col>
              <Col xs={grid !== 12 ? 12 : 8}>
                <Card.Body>
                  <Category>{product?.category?.toUpperCase()}</Category>
                  <Title>{product?.title}</Title>
                  <Detail>{product?.description}</Detail>
                  <Rating
                    readOnly
                    size="small"
                    name="simple-controlled"
                    value={product?.rating?.rate}
                  />

                  <Price className="text-success">${product?.price}</Price>
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>

        <ActionBar className="position-absolute">
          <div className="d-flex flex-column gap-15 z-1 ">
            <Tippy content={"Add to compare"}>
              <Checkbox
                checked={isComparing}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={() => {
                  if (isComparing === false) {
                    dispatch(addProductsToCompareList(product));
                  } else {
                    dispatch(removeProductsFromCompareList(product));
                  }
                }}
                icon={<CompareIcon color="warning" />}
                checkedIcon={<CheckIcon color="error" />}
              />
            </Tippy>
            <Tippy content={"See detail"}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                }}
                size="small"
                aria-label="views"
                color="warning"
              >
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
            </Tippy>

            <Tippy content={"Add to cart"}>
              <IconButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  // navigate("/")
                  dispatch(
                    addProductsToCartList({
                      ...product,
                      totalPrice: product.price * product.quantity,
                    })
                  );
                }}
                size="small"
                aria-label="add-to-cart"
                color="warning"
              >
                <ShoppingBagOutlinedIcon fontSize="small" />
              </IconButton>
            </Tippy>
          </div>
        </ActionBar>
      </ProductItem>
    </NavLink>
  );
}
