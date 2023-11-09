import { Box, List } from "@mui/material"
import { allProductsState } from "../app/Redux/products/productSlice"
import { useAppSelector } from "../app/hooks"
import RandomItem from "./RandomItem"
import getRandomElements from "../utils/randomProducts"
import getRandomItems from "../utils/randomProducts"

export default function RandomProducts() {
  const allProducts = useAppSelector(allProductsState)
  return (
    <div className="d-flex flex-column gap-15">
      {getRandomItems(allProducts)?.map((product) => (
        <RandomItem key={product?.id} product={product} />
      ))}
    </div>
  )
}
