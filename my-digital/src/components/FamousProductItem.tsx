import styled from "styled-components"
import { IFamousList } from "../data/data"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import { getProductsInCategory } from "../app/Redux/products/productSlice"

const FamousContent = styled.div`
  top: 10%;
  left: 5%;
`

const FamousItem = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px #0000001a;

  transition: all 0.3s;
  &:hover {
    transform: scale(0.95);
  }

  overflow: hidden;
  &:hover img {
    transition: all 0.5s ease;
    transform: scale(1.05);
  }
`

interface IFamousProductItem {
  famous: IFamousList
  index?: number
}

export default function FamousProductItem({
  famous,
  index,
}: IFamousProductItem) {
  const { detail, description, image, productname, to, categoryId } = famous
  const dispatch = useAppDispatch()
  return (
    <Link to={to}>
      <FamousItem
        className="famous-card position-relative rounded-3"
        onClick={() => dispatch(getProductsInCategory(categoryId))}
      >
        <img src={image} className="img-fluid rounded rounded-3" alt="famous" />
        <FamousContent className="position-absolute">
          <h5 className={index === 0 ? "text-white" : "text-dark"}>{detail}</h5>
          <h6 className={index === 0 ? "text-white" : "text-dark"}>
            {productname}
          </h6>
          <p className={index === 0 ? "text-white" : "text-dark"}>
            {description}
          </p>
        </FamousContent>
      </FamousItem>
    </Link>
  )
}
