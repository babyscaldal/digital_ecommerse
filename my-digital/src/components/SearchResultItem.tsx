import Image from "./Image"
import images from "../Image/images"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { IProductResponse } from "../app/Redux/products/productType"
import { useFormContext } from "react-hook-form"

const ItemWrapper = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.5s;
  height: 90px;
  width: 440px;

  &:hover {
    background-color: var(--color-febd69);
  }
`

const Title = styled.p`
  font-weight: 500;
  margin: 0;
  margin-top: 5px;
  font-size: 14px;
  color: var(--color-1c1c1b);
`
const Price = styled.p`
  margin: 0;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 500;
`

interface ISearchResultItem {
  product: IProductResponse
  onHideResult?: () => void
}

export default function SearchResultItem({
  product,
  onHideResult,
}: ISearchResultItem) {
  const navigate = useNavigate()
  const { reset } = useFormContext()
  return (
    <ItemWrapper
      className="d-flex align-items-center gap-4"
      onClick={() => {
        onHideResult && onHideResult()
        reset()
        navigate(`/products/${product?.category}/${product?.id}`)
      }}
    >
      <Image src={product?.image} width="70px" height="70px" />
      <div>
        <Title>{product?.title}</Title>
        <Price className="text-success">${product?.price}</Price>
      </div>
    </ItemWrapper>
  )
}
