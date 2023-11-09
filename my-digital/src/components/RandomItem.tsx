import { useNavigate } from "react-router-dom"
import { IProductResponse } from "../app/Redux/products/productType"
import Image from "./Image"
import styled from "styled-components"

interface IRandomItem {
  product: IProductResponse
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.25s linear;
  box-shadow: 0 0 10px #0000001a;
  border: 1px solid #ccc;
  height: 100px;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
  }
`

const Title = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
  font-size: 16px;
  color: var(--color-131921);
  text-overflow: ellipsis;
  overflow: hidden;
`

export default function RandomItem({ product }: IRandomItem) {
  const navigate = useNavigate()
  return (
    <>
      <Wrapper
        onClick={() => {
          navigate(`/products/${product?.category}/${product?.id}`)
        }}
      >
        <Image
          contain
          width="80px"
          height="80px"
          alt={product?.title}
          src={product?.image}
        />

        <div>
          <Title className="m-0">{product?.title}</Title>
          <p className="m-0">${product?.price}</p>
        </div>
      </Wrapper>
    </>
  )
}
