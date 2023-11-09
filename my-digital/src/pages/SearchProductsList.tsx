import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import styled from "styled-components"

import ToggleGrid from "../components/ToggleGrid"
import FilterMenuContainer from "../components/FilterMenuContainer"
import { useAppSelector } from "../app/hooks"
import {
  filterProductsListState,
  isLoadingState,
} from "../app/Redux/products/productSlice"
import SkeletonItemCard from "../components/ItemSkeleton"
import ProductCard from "../components/ProductCard"

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
`
const FilterSortGrid = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px #0000001a;
`

const ResultText = styled.p`
  font-weight: 500;
  margin: 0;
`

export default function SearchProductsList() {
  const filterProducts = useAppSelector(filterProductsListState)
  const isLoading = useAppSelector(isLoadingState)
  const [grid, setGrid] = useState<number>(3)

  const handleChange = (value: number) => {
    setGrid(value)
  }

  return (
    <Wrapper>
      <Container fluid="xxl" className="py-3">
        <Row className="g-3">
          <Col xs={12}>
            <Row className="g-3">
              <Col xs={12}>
                <FilterSortGrid>
                  <div className="d-flex justify-content-between align-items-center">
                    <FilterMenuContainer />
                    <ResultText>
                      <span className="text-danger">
                        {filterProducts?.length}
                      </span>{" "}
                      results was found
                    </ResultText>
                    <div className="d-flex align-items-center gap-10">
                      <ToggleGrid grid={grid} onChange={handleChange} />
                    </div>
                  </div>
                </FilterSortGrid>
              </Col>
              <Col xs={12}>
                <FilterSortGrid>
                  {filterProducts.length ? (
                    <Row className="g-3">
                      {filterProducts?.map((product, index) => (
                        <Col key={index} xs={12} md={4} lg={3}>
                          {isLoading ? (
                            <SkeletonItemCard />
                          ) : (
                            <ProductCard product={product} />
                          )}
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <h2>No Products Found</h2>
                  )}
                </FilterSortGrid>
              </Col>
              <Col xs={12}>
                {/* <FilterSortGrid>
                  <div className="d-flex justify-content-center align-items-center">
                    <Pagination
                      page={currentPage}
                      count={pageNumber}
                      variant="outlined"
                      shape="rounded"
                      onChange={onPageChange}
                    />
                  </div>
                </FilterSortGrid> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}
