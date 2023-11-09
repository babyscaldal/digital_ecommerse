import { Col, Container, Row } from "react-bootstrap"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs"

import images from "../Image/images"
import SubscribeBarForm from "./SubscribeBarForm"

const FooterContainer = styled.footer`
  background-color: var(--color-232f3e);

  border-top: 1px solid rgba(255, 255, 255, 0.1);
`
const FooterLinks = styled.div``
const FooterTop = styled.div``
export default function Footer() {
  return (
    <>
      <FooterContainer className="py-4">
        <Container fluid="xxl">
          <Row className="align-items-center g-3">
            <Col xs={12} lg={5}>
              <FooterTop className="d-flex gap-30 align-items-center ">
                <img src={images.newsLetter} alt="newsLetter" />
                <h2 className="mb-0 text-white  ">Sign Up for Newsletter</h2>
              </FooterTop>
            </Col>
            <Col xs={12} lg={7}>
              <SubscribeBarForm />
            </Col>
          </Row>
        </Container>
      </FooterContainer>
      <FooterContainer className="py-">
        <Container fluid="xxl">
          <Row className="g-3">
            <Col xs={12} md={6} lg={4}>
              <h4 className="text-white my-4">Contact Us</h4>
              <address className="text-white fs-6">
                Storage Corp.
                <br />
                17 Duy Tan, Cau Giay, Ha Noi
              </address>
              <a
                href="tel:+84 0363058141"
                className="mt-3 mb-1 d-block text-white"
              >
                Hotline:{" "}
                <span className="text-decoration-underline">
                  +84 0363058141
                </span>
              </a>
              <a
                href="mailto:sonhainguyen2201@gmail.com"
                className="mt-2 mb-0 d-block text-white"
              >
                Email:{" "}
                <span className="text-decoration-underline">
                  sonhainguyen2201@gmail.com
                </span>
              </a>
              <div className="social-icons d-flex mt-4 gap-30 align-items-center">
                <a className="text-white" href="">
                  <BsLinkedin className="fs-4" />
                </a>
                <a className="text-white" href="">
                  <BsInstagram className="fs-4" />
                </a>
                <a className="text-white" href="">
                  <BsGithub className="fs-4" />
                </a>
                <a className="text-white" href="">
                  <BsYoutube className="fs-4" />
                </a>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <h4 className="text-white my-4">Information</h4>
              <FooterLinks className="d-flex flex-column ">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-condition" className="text-white py-2 mb-1">
                  Term & Condition
                </Link>
                <Link to="/blogs" className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </FooterLinks>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <h4 className="text-white my-4">Account</h4>
              <FooterLinks className="d-flex flex-column ">
                <Link className="text-white py-2 mb-1" to="">
                  About Us
                </Link>
                <Link className="text-white py-2 mb-1" to="">
                  FAQ
                </Link>
                <Link className="text-white py-2 mb-1" to="">
                  Contact
                </Link>
              </FooterLinks>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <h4 className="text-white my-4">Quick Links</h4>
              <FooterLinks className="d-flex flex-column ">
                <Link className="text-white py-2 mb-1" to="">
                  Laptop
                </Link>
                <Link className="text-white py-2 mb-1" to="">
                  Headphones
                </Link>
                <Link className="text-white py-2 mb-1" to="">
                  Tablets
                </Link>
                <Link className="text-white py-2 mb-1" to="">
                  Watch
                </Link>
              </FooterLinks>
            </Col>
          </Row>
        </Container>
      </FooterContainer>
      <FooterContainer className="py-4">
        <Container fluid="xxl">
          <Row>
            <Col xs={12}>
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()} - Powered By SonHaiNguyen
              </p>
            </Col>
          </Row>
        </Container>
      </FooterContainer>
    </>
  )
}
