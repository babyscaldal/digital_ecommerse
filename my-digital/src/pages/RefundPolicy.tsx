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

const RefundPolicy = () => {
  useTitle("Refund Policy")

  return (
    <Wrapper>
      <Container fluid="xxl" className="py-5 policy-wrapper">
        <Row>
          <Col xs={12}>
            <Policy></Policy>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default RefundPolicy
