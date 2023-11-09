import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { SwiperSlide } from "swiper/react";
import { IconButton } from "@mui/material";

import ServiceItem from "../components/ServiceItem";
import {
  brandList,
  famousList,
  smallerCart,
  totalServices,
} from "../data/data";
import CategoryItem from "../components/CategoryItem";
import Image from "../components/Image";
import BlogCard from "../components/BlogCard";
import FamousProductItem from "../components/FamousProductItem";
import useTitle from "../hooks/useTitle";
import PopularList from "../components/PopularList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProductsInCategory } from "../app/Redux/products/productSlice";
import { categories } from "../app/Redux/Categories/CategorySlice";
import HeroCarousel from "../components/Carousel";
import { allBlogState } from "../app/Redux/blogs/blogSlice";
import ResponsiveSlides from "../components/ResponsiveSlides";

const FirstHomeWrapper = styled.section`
  background-color: var(--color-f5f5f7);
`;

const ServicesWrapper = styled.section``;

const FamousWrapper = styled.section`
  background-color: var(--color-f5f5f7);
  h5 {
    font-size: 13px;
    line-height: 20px;
    font-weight: 400px;
    color: white;
    margin-bottom: 7px;
    text-transform: uppercase;
  }
  h6 {
    font-size: 24px;
    line-height: 38px;
    font-weight: 500;
    color: white;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    font-weight: 100;
    color: white;
  }
`;

const CategoriesWrapper = styled.section`
  background-color: var(--color-f5f5f7);
`;

const SmallerBanner = styled.div`
  overflow: hidden;
  img {
    border-radius: 8px;
  }
  &:hover img {
    transition: all 0.25s ease;
    transform: scale(1.05);
  }
`;

const SmallerBannerContent = styled.div`
  top: 25%;
  left: 10%;

  h4 {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: var(--color-bf4800);
    margin: 0 0 12px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  h5 {
    font-size: 22px;
    line-height: 34px;
    letter-spacing: -2px;
    font-weight: 500;
    text-transform: none;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.4;
    color: var(--color-131921);
  }
`;
const Services = styled.div``;

const Categories = styled.div``;

const MarqueeWrapper = styled.section`
  background-color: var(--color-f5f5f7);
`;

const MarqueeInner = styled.div`
  background-color: white;
  box-shadow: 0 0 10px #0000001a;
  padding: 15px;
`;

const BlogWrapper = styled.section`
  background-color: var(--color-f5f5f7);
`;

const Heading = styled.h3`
  font-size: 26px;
  line-height: 32px;
  font-weight: 500;
`;

const AllWrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`;

export default function Home() {
  useTitle("Storage");

  const dispatch = useAppDispatch();

  const allCategories = useAppSelector(categories);
  const allBlogs = useAppSelector(allBlogState);

  return (
    <AllWrapper>
      <FirstHomeWrapper className="pt-3 pb-5">
        <Container fluid="xxl">
          <Row className="g-3">
            <Col xs={12} lg={6}>
              <HeroCarousel />
            </Col>
            <Col xs={12} lg={6}>
              <div className="d-flex text-center text-md-start flex-wrap justify-content-between align-items-center">
                <Row className="g-3">
                  {smallerCart.map((cart, index) => (
                    <Col key={index} xs={12} md={6}>
                      <Link to={cart.to}>
                        <SmallerBanner className="position-relative">
                          <img
                            className="img-fluid"
                            src={cart.image}
                            alt="mainBanner"
                          />
                          <SmallerBannerContent className="position-absolute w-50">
                            <h4>{cart.title}</h4>
                            <h5>{cart.product}</h5>
                            <p>{cart.info}</p>
                          </SmallerBannerContent>
                        </SmallerBanner>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </FirstHomeWrapper>

      <ServicesWrapper className="py-5">
        <Container fluid="xxl">
          <Row className="g-3 ">
            <Col xs={12}>
              <Services>
                <Row className="g-3 text-center text-md-start">
                  <Col xs={12}>
                    <Heading>Services</Heading>
                  </Col>
                  {totalServices.map((service, index) => (
                    <Col key={index} xs={12} md={4}>
                      <ServiceItem service={service} />
                    </Col>
                  ))}
                </Row>
              </Services>
            </Col>
          </Row>
        </Container>
      </ServicesWrapper>

      <CategoriesWrapper>
        <div
          className="py-5"
          style={{ backgroundColor: "var(--color-f5f5f7)" }}
        >
          <Container fluid="xxl">
            <Categories>
              <Row className="g-3 text-center text-md-start">
                <Col xs={12}>
                  <Heading>Categories List</Heading>
                </Col>
                {allCategories?.map((item) => {
                  return (
                    <Col
                      key={item.id}
                      xs={12}
                      md={6}
                      lg={3}
                      onClick={() => {
                        dispatch(getProductsInCategory(item?.id));
                      }}
                    >
                      <CategoryItem item={item} />
                    </Col>
                  );
                })}
              </Row>
            </Categories>
          </Container>
        </div>
      </CategoriesWrapper>

      <FamousWrapper className="py-5">
        <Container fluid="xxl">
          <Row className="g-3 text-center text-md-start">
            <Col xs={12}>
              <Heading>Featured Collection</Heading>
            </Col>

            {famousList.map((famous, index) => (
              <Col key={index} xs={12} md={6} lg={3}>
                <FamousProductItem index={index} famous={famous} />
              </Col>
            ))}
          </Row>
        </Container>
      </FamousWrapper>

      <PopularList />

      <MarqueeWrapper>
        <Container fluid="xxl p-0 py-5">
          <Row>
            <Col xs={12}>
              <MarqueeInner className="bg-white p-3">
                <Marquee className="d-flex">
                  {brandList.map((brand, index) => (
                    <Image
                      className="mx-4"
                      key={index}
                      src={brand}
                      alt="brand"
                      height="150px"
                      width="150px"
                    />
                  ))}
                </Marquee>
              </MarqueeInner>
            </Col>
          </Row>
        </Container>
      </MarqueeWrapper>

      <BlogWrapper className="py-5">
        <Container fluid="xxl">
          <Row className="g-3 text-center text-md-start">
            <Col xs={12}>
              <div className="d-flex  justify-content-between align-items-center">
                <Heading>Our Latest Blogs</Heading>
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
                {allBlogs.map((blog) => (
                  <SwiperSlide key={blog?.id}>
                    <BlogCard blog={blog} />
                  </SwiperSlide>
                ))}
              </ResponsiveSlides>
            </Col>
          </Row>
        </Container>
      </BlogWrapper>
    </AllWrapper>
  );
}
