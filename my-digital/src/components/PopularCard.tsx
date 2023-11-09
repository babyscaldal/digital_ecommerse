import { Card, Col, Container, Row } from "react-bootstrap"
import Rating from "@mui/material/Rating"
import styled, { keyframes } from "styled-components"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Favorite from "@mui/icons-material/Favorite"
import { Checkbox, IconButton } from "@mui/material"
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import { NavLink } from "react-router-dom"
import { IProductResponse } from "../app/Redux/products/productType"
import { useAppSelector } from "../app/hooks"
import { isLoadingState } from "../app/Redux/products/productSlice"
import SkeletonItem from "./ItemSkeleton"
import SkeletonItemCard from "./ItemSkeleton"

interface IProductCard {
  product: IProductResponse
  grid?: number
}

const ActionBar = styled.div`
  top: 5px;
  right: -30px;
  transition: all 0.3s;
`
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const ProductItem = styled(Card)`
  width: 100%;
  box-shadow: 0 0 10px #0000001a;
  overflow: hidden;
  transition: all 0.25s linear;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }

  &:hover ${ActionBar} {
    animation: ${slideIn} 0.3s forwards linear;
    right: 5px;
  }

  &:hover img {
    transition: all 0.25s ease;
    transform: scale(1.2);
  }
`

const Category = styled(Card.Text)`
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--color-bf4800);
`

const Title = styled(Card.Title)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
  font-size: 16px;
  color: var(--color-131921);
  text-overflow: ellipsis;
  overflow: hidden;
`
const Price = styled(Card.Text)`
  font-weight: bold;
  font-size: 16px;
  color: var(--color-1c1b1b);
  margin-top: 8px;
`

const Detail = styled(Card.Text)`
  color: var(--color-777777);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  line-height: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const WishListIcon = styled.div`
  top: 5px;
  left: 5px;
`

export default function PopularCard({ product, grid }: IProductCard) {
  return (
    <NavLink to={`/products/${product?.category}/${product?.id}`}>
      <ProductItem className="position-relative">
        <WishListIcon className="position-absolute z-1">
          <Checkbox
            icon={<FavoriteBorder color="warning" />}
            checkedIcon={<Favorite color="error" />}
          />
        </WishListIcon>
        <Card>
          <Container>
            <Row>
              <Col xs={12}>
                <div className="d-flex justify-content-center align-items-center">
                  <Card.Img
                    style={{
                      padding: "25px",
                      objectFit: "cover",
                      width: "225px",
                      height: "225px",
                    }}
                    // variant="top"
                    src={product?.image}
                  />
                </div>
              </Col>
              <Col xs={12}>
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

                  <Price className="text-success">
                    ${product?.price.toFixed(1)}
                  </Price>
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>

        <ActionBar className="position-absolute">
          <div className="d-flex flex-column gap-15 z-1 ">
            <IconButton size="small" aria-label="compare" color="warning">
              <CompareArrowsOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="views" color="warning">
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="add-to-cart" color="warning">
              <ShoppingBagOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </ActionBar>
      </ProductItem>
    </NavLink>
  )
}
