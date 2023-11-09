import styled from "styled-components"
import { ITotalCart } from "../data/data"
import Image from "./Image"

interface IServiceItem {
  service: ITotalCart
}

const StyledServiceItem = styled.div`
  border: 1px solid var(--color-ededed);
  box-shadow: 0 0 10px #0000001a;
  padding: 0 20px;
  height: 120px;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover img {
    transform: rotateY(360deg);
    transition: all 1s linear;
  }

  &:hover {
    transform: scale(1.05);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function ServiceItem({ service }: IServiceItem) {
  const { image, info, title } = service
  return (
    <StyledServiceItem>
      <Image contain src={image} alt={title} height="50px" width="50px" />
      <div>
        <h6>{title}</h6>
        <p className="mb-0">{info}</p>
      </div>
    </StyledServiceItem>
  )
}

export default ServiceItem
