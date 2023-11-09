import { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "@mui/material";

const NavItemWrapper = styled.div`
  cursor: pointer;
  &:hover svg {
    transform: rotateY(360deg);
    transition: all 1s linear;
  }
`;

function ModalForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  return (
    <>
      <NavItemWrapper>
        <Link
          sx={{
            fontSize: "18px",
            color: "#fff",
            textDecoration: "none",
          }}
          onClick={handleShow}
        >
          <ShoppingCartOutlinedIcon sx={{ marginRight: "10px" }} />
          Cart
        </Link>
      </NavItemWrapper>

      <Modal style={{ zIndex: 5000 }} show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Please Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">Please login before access this cart!!!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/login");
              handleClose();
            }}
          >
            Login Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
