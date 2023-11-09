import { Col, Container, Row } from "react-bootstrap"
import styled from "styled-components"
import useTitle from "../hooks/useTitle"

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`

const Policy = styled.div`
  background-color: white;
  padding: 30px;
`

const PrivacyPolicy = () => {
  useTitle("Private Policy")
  return (
    <Wrapper>
      <Container fluid="xxl" className="policy-wrapper py-5 home-wrapper-2">
        <Row>
          <Col xs={12}>
            <Policy></Policy>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default PrivacyPolicy
