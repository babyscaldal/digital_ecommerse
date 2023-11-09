import { useState } from "react"
import { Carousel } from "react-bootstrap"
import styled from "styled-components"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"

import { IProductResponse } from "../app/Redux/products/productType"

interface IProductGallery {
  product?: IProductResponse
}

const StyledCarousel = styled(Carousel)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
`

export default function ProductGallery({ product }: IProductGallery) {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }
  return (
    <StyledCarousel
      nextIcon={
        <NavigateNextIcon
          sx={{ fontSize: "50px", color: "var(--color-131921)" }}
        />
      }
      prevIcon={
        <NavigateBeforeIcon
          sx={{ fontSize: "50px", color: "var(--color-131921)" }}
        />
      }
      activeIndex={index}
      onSelect={handleSelect}
    >
      {product?.gallery?.map((image, index) => (
        <Carousel.Item key={`image - ${index}`}>
          <div style={{ width: "100%", height: "500px" }}>
            <img
              style={{
                borderRadius: "10px",
                objectFit: "contain",
              }}
              width="100%"
              height="100%"
              src={image}
              alt="product-gallery"
            />
          </div>
        </Carousel.Item>
      ))}
    </StyledCarousel>
  )
}
