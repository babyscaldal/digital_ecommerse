import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { Col } from "react-bootstrap"

import { removeProductsFromCompareList } from "../app/Redux/products/productSlice"
import { useAppDispatch } from "../app/hooks"
import { IProductResponse } from "../app/Redux/products/productType"
import images from "../Image/images"

const CompareProductCard = styled.section`
  padding: 20px 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px #0000001a;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
    filter: brightness(105%);
  }
  &:hover img {
    opacity: 1;
  }
`

const CompareTitle = styled.h3`
  font-size: 20px;
  line-height: 22px;
  font-weight: 500;
  color: var(--color-1c1c1b);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
`

const CompareProductDetail = styled.div``

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  h6,
  p {
    margin: 0;
  }
`

export const Cross = styled.img`
  top: 15px;
  right: 15px;
  width: 25px;
  padding: 3px;
  cursor: pointer;
`

interface ICompareItem {
  product: IProductResponse
}

export default function CompareItem({ product }: ICompareItem) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <Col xs={3}>
      <Link
        to={`/products/${product?.category}/${product?.id}`}
        className="text-dark"
      >
        <CompareProductCard className="position-relative">
          <Cross
            src={images.cross}
            alt="cross"
            className="position-absolute cross img-fluid"
            onClick={(e) => {
              e.preventDefault()
              dispatch(removeProductsFromCompareList(product))
            }}
          />
          <img
            src={product?.image}
            alt={product?.title}
            className="img-fluid"
          />

          <CompareProductDetail>
            <CompareTitle>{product?.title}</CompareTitle>

            <div>
              <ProductDetail className="product-detail">
                <h6>💵 Price:</h6>
                <p>${product?.price}</p>
              </ProductDetail>
              <ProductDetail className="product-detail">
                <h6>💯 Brand:</h6>
                <p>APPLE</p>
              </ProductDetail>

              <ProductDetail className="product-detail">
                <h6>🥇 Type:</h6>
                <p>{product?.category}</p>
              </ProductDetail>
            </div>
          </CompareProductDetail>
        </CompareProductCard>
      </Link>
    </Col>
  )
}
