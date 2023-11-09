import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Chip, Pagination } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import useTitle from "../hooks/useTitle";
import ToggleGrid from "../components/ToggleGrid";
import FilterSideBarForm from "../components/FilterSideBarForm";
import SortBarForm from "../components/SortBarForm";
import {
  filterProductsListState,
  getProducts,
  getProductsInCategory,
} from "../app/Redux/products/productSlice";
import { categories } from "../app/Redux/Categories/CategorySlice";
import toCapitalize from "../utils/toCapitalize";
import RandomProducts from "../components/RandomProducts";

// eslint-disable-next-line react-refresh/only-export-components
export const FilterCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px 25px 15px 25px;
  box-shadow: 0 0 10px #0000001a;

  ul,
  label {
    list-style-type: none;
    font-size: 13px;
    line-height: 30px;
    color: var(--color-777777);
    cursor: pointer;
  }

  input:focus {
    box-shadow: none;
    border-color: rgba(0, 0, 0, 0.25);
  }

  input:checked {
    background-color: var(--color-febd69);
    border-color: var(--color-febd69);
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const FilterTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--color-1c1c1b);
  margin-bottom: 10px;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const CategoryList = styled.div`
  list-style-type: none;
  a {
    font-size: 13px;
    line-height: 30px;
    color: var(--color-777777);
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-1c1c1b);
  margin-bottom: 15px;
  margin-top: 20px;
`;

const FilterSortGrid = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px #0000001a;
`;

const Wrapper = styled.div`
  background-color: var(--color-f5f5f7);
  padding-top: 150px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 64px auto 64px;
  grid-gap: 16px;
  height: 1172px;
`;

const StyledGridItem = styled.div``;

interface IOutStore {
  currentPage: number;
  itemPerPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPageChange: (event: any, page: number) => void;
  onCategoryChange: () => void;
  onGridChange?: (value: number) => void;
  grid?: number;
}

export default function OurStore({
  itemPerPage,
  grid,
  onGridChange,
  currentPage,
  onPageChange,
  onCategoryChange,
}: IOutStore) {
  useTitle("Our Store");
  const filterProducts = useAppSelector(filterProductsListState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allCategories = useAppSelector(categories);

  const pageNumber = Math.ceil(filterProducts?.length / itemPerPage);

  return (
    <>
      <Wrapper>
        <Container fluid="xxl" className="py-3">
          <Row className="g-3">
            <Col xs={3} style={{ minWidth: "200px", height: "100%" }}>
              <Row className="g-3">
                <Col xs={12}>
                  <FilterCard>
                    <FilterTitle>Categories</FilterTitle>
                    <CategoryList>
                      <li>
                        <NavLink
                          onClick={() => {
                            onCategoryChange();
                            dispatch(getProducts());
                          }}
                          style={({ isActive }) => {
                            return {
                              color: isActive ? "blue" : "",
                            };
                          }}
                          to={`/products/all`}
                        >
                          All Products
                        </NavLink>
                      </li>
                      {allCategories?.map((category) => (
                        <li key={category?.id}>
                          <NavLink
                            onClick={() => {
                              dispatch(getProductsInCategory(category?.id));
                              onCategoryChange();
                            }}
                            style={({ isActive }) => {
                              return {
                                color: isActive ? "blue" : "",
                              };
                            }}
                            to={`/products/${category?.category}`}
                          >
                            {toCapitalize(category?.category)}
                          </NavLink>
                        </li>
                      ))}
                    </CategoryList>
                  </FilterCard>
                </Col>
                <Col xs={12}>
                  <FilterCard>
                    <FilterTitle>Filter By</FilterTitle>
                    <FilterSideBarForm />
                  </FilterCard>
                </Col>
                <Col xs={12}>
                  <FilterCard>
                    <FilterTitle>Product Tags</FilterTitle>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-1">
                      {allCategories?.map((category, index) => (
                        <Chip
                          key={index}
                          label={toCapitalize(category?.category)}
                          onClick={() => {
                            dispatch(getProductsInCategory(category?.id));
                            navigate(`/products/${category?.category}`);
                          }}
                        />
                      ))}
                    </div>
                  </FilterCard>
                </Col>
                <Col xs={12}>
                  <FilterCard>
                    <FilterTitle>Random Product</FilterTitle>
                    <RandomProducts />
                  </FilterCard>
                </Col>
              </Row>
            </Col>
            <Col xs={9}>
              <GridContainer>
                <StyledGridItem>
                  <FilterSortGrid>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-10">
                        <p className="mb-0 d-block">Sort By:</p>
                        <SortBarForm />
                      </div>
                      <div className="d-flex align-items-center gap-10">
                        <p className="mb-0">
                          {filterProducts?.length} products
                        </p>
                        <ToggleGrid grid={grid} onGridChange={onGridChange} />
                      </div>
                    </div>
                  </FilterSortGrid>
                </StyledGridItem>
                <StyledGridItem>
                  <Outlet />
                </StyledGridItem>
                <StyledGridItem>
                  <FilterSortGrid>
                    <div className="d-flex justify-content-center align-items-center">
                      <Pagination
                        page={currentPage}
                        count={pageNumber}
                        variant="outlined"
                        shape="rounded"
                        onChange={onPageChange}
                      />
                    </div>
                  </FilterSortGrid>
                </StyledGridItem>
              </GridContainer>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}
