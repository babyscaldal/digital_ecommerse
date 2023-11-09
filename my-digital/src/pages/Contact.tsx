import styled from "styled-components"
import { Col, Container, Row } from "react-bootstrap"
import HomeIcon from "@mui/icons-material/Home"
import CallIcon from "@mui/icons-material/Call"
import EmailIcon from "@mui/icons-material/Email"
import InfoIcon from "@mui/icons-material/Info"
import ContactForm from "../components/ContactForm"
import useTitle from "../hooks/useTitle"

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`

const ContactInnerWrapper = styled.div`
  padding: 30px 20px;
  border-radius: 15px;
  background-color: white;
  gap: 15px;

  & > div {
    width: 48%;
  }

  ul {
    list-style: none;
  }

  address,
  a,
  p {
    color: var(--color-777777);
  }
`

const ContactTitle = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 35px;
  text-align: left;
`

export default function Contact() {
  useTitle("Contact")
  return (
    <Wrapper>
      <Container fluid={"xxl"}>
        <Row>
          <Col xs={12}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3725.812076840414!2d105.76559177411575!3d20.96006059013681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDU3JzM2LjIiTiAxMDXCsDQ2JzA1LjQiRQ!5e0!3m2!1sen!2s!4v1696729787866!5m2!1sen!2s"
              width="600"
              height="450"
              className="border-0 w-100"
              loading="lazy"
            ></iframe>
          </Col>
          <Col xs={12} className="my-5">
            <ContactInnerWrapper className="d-flex justify-content-between ">
              <div>
                <ContactTitle className="mb-4">Contact</ContactTitle>
                <ContactForm />
              </div>
              <div>
                <ContactTitle className="mb-4">
                  Get in touch with us
                </ContactTitle>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <HomeIcon />
                      <address className="mb-0">
                        17 Duy Tân, Cầu Giấy, Hà Nội
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <CallIcon />
                      <a href="tel:+84 363058141">+84 363058141</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <EmailIcon />
                      <a href="mailto:navdeepdahiya753@gmail.com">
                        sonhainguyen2201@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <InfoIcon />
                      <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </ContactInnerWrapper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}
