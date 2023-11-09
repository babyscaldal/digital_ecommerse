import { IProductResponse } from "../app/Redux/products/productType"

function getRandomItems(array: IProductResponse[]) {
  if (array.length < 2) return
  const result = []
  const randomIndex1 = Math.floor(Math.random() * array.length)
  result.push(array[randomIndex1])
  let randomIndex2 = Math.floor(Math.random() * array.length)
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * array.length)
  }
  result.push(array[randomIndex2])
  return result
}

export default getRandomItems
