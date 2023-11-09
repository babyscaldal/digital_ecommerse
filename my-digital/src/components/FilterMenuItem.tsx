import { ReactNode, useState } from "react"
import Offcanvas from "react-bootstrap/Offcanvas"
import IconButton from "@mui/material/IconButton"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Button } from "react-bootstrap"
import styled from "styled-components"
import { useFormContext } from "react-hook-form"
import { IFilterOptions } from "./FilterMenuContainer"

const CanvasFooter = styled.div`
  padding: 13px 25px;
`

interface IFilterMenuItem {
  category?: string
  option?: IFilterOptions
}

function FilterMenuItem({ category, option }: IFilterMenuItem) {
  const [show, setShow] = useState(false)

  const handleCloseChild = () => setShow(false)
  const handleShowChild = () => setShow(true)

  const { reset } = useFormContext()
  return (
    <>
      <IconButton onClick={handleShowChild}>
        <ArrowForwardIcon />
      </IconButton>

      <Offcanvas
        placement="start"
        show={show}
        onHide={handleCloseChild}
        style={{ zIndex: 1110 }}
      >
        <Offcanvas.Header
          closeButton
          style={{ borderBottom: "1px solid #cccccc" }}
        >
          <div className="d-flex align-items-center">
            <IconButton onClick={handleCloseChild}>
              <ArrowBackIcon />
            </IconButton>
            <Offcanvas.Title as={"h6"}>Filter By {category}</Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>{option?.element}</Offcanvas.Body>
        <CanvasFooter className="d-flex align-items-center justify-content-center gap-4">
          <Button
            onClick={() => {
              reset()
            }}
            variant="danger"
            style={{ width: "130px" }}
            className="rounded rounded-pill"
          >
            Clear
          </Button>
          <Button
            onClick={handleCloseChild}
            variant="success"
            style={{ width: "130px" }}
            className="rounded rounded-pill"
          >
            Apply
          </Button>
        </CanvasFooter>
      </Offcanvas>
    </>
  )
}

export default FilterMenuItem
