import Pagination from "react-bootstrap/Pagination"

function PaginationComponent() {
  return (
    <Pagination className="m-0">
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Next />
    </Pagination>
  )
}

export default PaginationComponent
