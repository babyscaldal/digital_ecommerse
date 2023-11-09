import { Rating } from "@mui/material";
import { Button } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";

const SpecialProductItem = styled.div`
  padding: 20px 10px;
  border-radius: 10px;
  background-color: white;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px #0000001a;
`;

export default function SpecialProduct() {
  return (
    <SpecialProductItem className="special-product-card">
      <div className="d-flex justify-content-between">
        <div>
          <img src="images/watch.jpg" className="img-fluid" alt="watch" />
        </div>
        <div className="special-product-content">
          <h5 className="brand">Havels</h5>
          <h6 className="title">Samsung Galaxy Note10+ Mobile Phone; Sim...</h6>
          <Rating size="small" name="simple-controlled" value={5} />
          <p className="price">
            <span className="text-danger">$100</span> &nbsp;
            <span className="text-decoration-line-through">$200</span>
          </p>
          <div className="discount-till d-flex align-items-center gap-10">
            <p className="mb-0">
              <b>5 </b>days
            </p>
            <div className="d-flex gap-10 align-items-center">
              <span className="badge rounded-circle p-3 bg-danger">1</span>:
              <span className="badge rounded-circle p-3 bg-danger">1</span>:
              <span className="badge rounded-circle p-3 bg-danger">1</span>
            </div>
          </div>
          <div className="prod-count my-3">
            <p>Products: 5</p>
            <ProgressBar
              variant="success"
              now={60}
              style={{ height: "10px", width: "100%" }}
            />
          </div>
          <Button className="button rounded rounded-pill px-3 py-2">
            Add to Cart
          </Button>
        </div>
      </div>
    </SpecialProductItem>
  );
}
