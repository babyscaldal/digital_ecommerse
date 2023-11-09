import styled from "styled-components"
import useTitle from "../hooks/useTitle"
import { Container, Row, Col } from "react-bootstrap"
import SignUpForm from "../components/SignUpForm"

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`

const AuthCard = styled.div`
  padding: 20px;
  background-color: white;
  width: 500px;
  margin: auto;
  margin-bottom: 10px;
  border-radius: 10px;

  h3 {
    font-size: 30px;
    font-weight: 500;
    color: var(--color-777777);
  }

  p {
    font-size: 13px;
    color: var(--color-777777);
  }
`

export default function SignUp() {
  useTitle("Sign Up")
  return (
    <Wrapper>
      <Container fluid="xxl">
        <Row>
          <Col xs={12}>
            <AuthCard>
              <h3 className="text-center mb-3">Create An Account</h3>
              <SignUpForm />
            </AuthCard>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}
