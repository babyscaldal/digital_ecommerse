import { useState } from "react"
import Carousel from "react-bootstrap/Carousel"
import images from "../Image/images"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

const MainBannerContent = styled.div`
  top: 15%;
  left: 5%;

  h4 {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--color-bf4800);
    margin: 0 0 12px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  h5 {
    font-size: 42px;
    line-height: 54px;
    letter-spacing: -2px;
    font-weight: 500;
    text-transform: none;
  }

  p {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.4px;
    color: var(--color-131921);
  }
`

function HeroCarousel() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="img-fluid rounded-3"
          src={images.mainBanner}
          alt="mainBanner"
        />
        <MainBannerContent className="p-3 position-absolute">
          <h4>SUPERCHARGED FOR PROS.</h4>
          <h5>iPAD Pro.</h5>
          <p>From &799.00</p>
          <Button
            onClick={() => {
              navigate("/products/iPad/11")
            }}
            variant="secondary"
            className="button"
          >
            BUY NOW
          </Button>
          {/* </Link> */}
        </MainBannerContent>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img-fluid rounded-3"
          src={images.mainBanner2}
          alt="mainBanner"
        />
        <MainBannerContent className="p-3 position-absolute">
          <h4>SUPERCHARGED FOR PROS.</h4>
          <h5>iPhone 15 Pro.</h5>
          <p>From &999.00</p>
          {/* <Link to=""> */}
          <Button
            onClick={() => {
              navigate("/products/iPhone/7")
            }}
            variant="secondary"
            className="button"
          >
            BUY NOW
          </Button>
          {/* </Link> */}
        </MainBannerContent>
      </Carousel.Item>
    </Carousel>
  )
}

export default HeroCarousel
