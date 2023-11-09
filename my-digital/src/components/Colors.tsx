import styled from "styled-components"

const ColorItem = styled.div`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  li {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
  }
`

const Color = () => {
  return (
    <>
      <ColorItem className="ps-0">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ColorItem>
    </>
  )
}

export default Color
