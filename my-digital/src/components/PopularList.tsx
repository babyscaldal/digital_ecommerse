import styled from "styled-components"
import { SwiperSlide } from "swiper/react"
import { Col, Container, Row } from "react-bootstrap"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import ResponsiveSlides from "./ResponsiveSlides"
import { IconButton } from "@mui/material"

import PopularCard from "./PopularCard"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { popularProductsState } from "../app/Redux/products/productSlice"
import { categories } from "../app/Redux/Categories/CategorySlice"

const PopularWrapper = styled.section`
  background-color: var(--color-f5f5f7);
`

const Heading = styled.h3`
  font-size: 26px;
  line-height: 32px;
  font-weight: 500;
`

export default function PopularList() {
  const popularProducts = useAppSelector(popularProductsState)

  return (
    <PopularWrapper className="py-5">
      <Container fluid="xxl">
        <Row className="g-3 text-center text-md-start">
          <Col xs={12}>
            <div className="d-flex  justify-content-between align-items-center">
              <Heading>Our Popular Products</Heading>
              <div className="slider-controller d-flex">
                <div className="slider-button-prev slider-arrow">
                  <IconButton>
                    <NavigateBeforeIcon />
                  </IconButton>
                </div>
                <div className="slider-button-next slider-arrow">
                  <IconButton>
                    <NavigateNextIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12}>
            <ResponsiveSlides>
              {popularProducts?.map((product) => (
                <SwiperSlide key={product?.id}>
                  <PopularCard product={product} />
                </SwiperSlide>
              ))}
            </ResponsiveSlides>
          </Col>
        </Row>
      </Container>
    </PopularWrapper>
  )
}
