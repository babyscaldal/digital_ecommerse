import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import MyProfileForm from "../components/MyProfileForm";

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`;

const AuthCard = styled.div`
  padding: 20px;
  background-color: white;
  width: 500px;
  margin: 30px auto;
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
`;

export default function MyProfile() {
  return (
    <>
      <Wrapper>
        <Container fluid={"xxl"} className="home-wrapper-2">
          <Row>
            <Col xs={12}>
              <AuthCard>
                <h3 className="text-center mb-3">My Profile</h3>
                <MyProfileForm />
              </AuthCard>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}
