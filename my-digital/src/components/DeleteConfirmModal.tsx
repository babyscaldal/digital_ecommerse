import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"

import { IProductResponse } from "../app/Redux/products/productType"
import { useAppSelector } from "../app/hooks"
import { selectedCartListState } from "../app/Redux/cart/CartSlice"
import { Tooltip } from "@mui/material"

interface IDeleteConfirmModal {
  item?: IProductResponse
  onDeleteSingle?: () => void
  onDeleteAllSelected?: (products: IProductResponse[]) => void
  title: string
  count?: number
  setCount?: React.Dispatch<React.SetStateAction<number>>
}

function DeleteConfirmModal({
  item,
  setCount,
  count,
  title,
  onDeleteSingle,
  onDeleteAllSelected,
}: IDeleteConfirmModal) {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    if (count === 0) {
      setCount && setCount(1)
      setShow(false)
    } else {
      setShow(false)
    }
  }
  const handleShow = () => setShow(true)

  const selectedCartList = useAppSelector(selectedCartListState)

  useEffect(() => {
    if (count === 0) {
      setShow(true)
    }
  }, [count])

  return (
    <>
      <Tooltip arrow title={title}>
        <IconButton
          color="warning"
          aria-label="delete"
          size="small"
          onClick={() => {
            handleShow()
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Modal style={{ zIndex: 5000 }} show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove Products From Cart List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">Are you sure remove this products?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              onDeleteSingle && onDeleteSingle()
              onDeleteAllSelected && onDeleteAllSelected(selectedCartList)
              handleClose()
            }}
          >
            Delete Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteConfirmModal
