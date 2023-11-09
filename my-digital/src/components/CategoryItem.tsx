import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import Image from "./Image"
import { useAppDispatch } from "../app/hooks"
import { getProductsInCategory } from "../app/Redux/products/productSlice"
import toCapitalize from "../utils/toCapitalize"
import { ICategoryResponse } from "../app/Redux/Categories/CategoryType"

const Wrapper = styled.div`
  border: 1px solid var(--color-ededed);
  box-shadow: 0 0 10px #0000001a;
  padding: 0 10px;
  height: 120px;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    transform: scale(1.05);
  }
`

interface ICategoryItem {
  item: ICategoryResponse
}

export default function CategoryItem({ item }: ICategoryItem) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Wrapper
      onClick={() => {
        dispatch(getProductsInCategory(item?.id))
        navigate(`/products/${item?.category}`)
      }}
      className="d-flex gap-30 align-items-center justify-content-between"
    >
      <div>
        <h5>{toCapitalize(item?.category)}</h5>
      </div>

      <Image
        contain
        src={item?.image}
        alt={item?.category}
        height="100px"
        width="100px"
      />
    </Wrapper>
  )
}
