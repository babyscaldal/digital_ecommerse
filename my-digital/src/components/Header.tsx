import { Col, Container, Dropdown, Row } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import CompareIcon from "@mui/icons-material/Compare"
import PersonIcon from "@mui/icons-material/Person"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Badge } from "@mui/material"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { useEffect, useState } from "react"
import { AppBar } from "@mui/material"

import images from "../Image/images"
import { navOption } from "../data/data"
import SearchBarForm from "./SearchBarForm"
import UserLoggedInMenu from "./UserLoggedInMenu"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { categories } from "../app/Redux/Categories/CategorySlice"
import {
  cartProductsState,
  compareProductsState,
  favoriteProductsState,
  getProducts,
  getProductsInCategory,
} from "../app/Redux/products/productSlice"
import { getCurrentUser, isLoginState } from "../app/Redux/users/userSlice"
import ModalForm from "./Modal"

const HeaderUpperContainer = styled.div`
  background: var(--color-131921);
  height: 75px;
`

const HeaderBottomContainer = styled.div`
  background-color: var(--color-232f3e);
  height: 75px;
`

const MenuBottom = styled.div``
const MenuLink = styled.div``

const StyledNavLink = styled(NavLink)`
  color: white;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0.3;
  text-transform: uppercase;
`
const DropdownMenu = styled(Dropdown.Menu)`
  background-color: var(--color-131921);
  transform: translate3d(0px, 58px, 0px) !important;
  width: 100%;
`
const DropdownToggle = styled(Dropdown.Toggle)`
  color: white;
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0.3;
  text-transform: uppercase;

  &:focus {
    box-shadow: none;
  }
`

const DropdownItem = styled(Dropdown.Item)`
  font-size: 14px;
  padding: 10px;
  margin-bottom: 3px;
  border-bottom: 1px solid var(--color-3b4149);
  color: #fff;

  &:hover ${StyledNavLink} {
    color: var(--color-131921);
    font-weight: 400;
  }

  &:hover {
    background-color: var(--color-febd69);
  }

  &:active {
    background-color: var(--color-febd69);
  }
`

const NavItemWrapper = styled.div`
  &:hover svg {
    transform: rotateY(360deg);
    transition: all 1s linear;
  }
`

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogin = useAppSelector(isLoginState)

  useEffect(() => {
    if (isLogin) {
      dispatch(getCurrentUser())
    }
  }, [isLogin])

  const categoriesList = useAppSelector(categories)
  const favoriteProducts = useAppSelector(favoriteProductsState)
  const compareProducts = useAppSelector(compareProductsState)
  const cartProducts = useAppSelector(cartProductsState)

  return (
    <AppBar position="fixed" sx={{ boxShadow: "none" }}>
      <HeaderUpperContainer className="py-3">
        <Container fluid="xxl">
          <Row className="align-items-center justify-content-around">
            <Col xs={3}>
              <h2 className="m-0">
                <NavLink
                  // onClick={() => window.location.reload()}
                  className="text-white"
                  to="/"
                >
                  DIGITAL ZONE
                </NavLink>
              </h2>
            </Col>
            <Col xs={8}>
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-30">
                <NavItemWrapper>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        fontSize: "18px",
                        color: isActive
                          ? "var(--color-febd69)"
                          : "var(--color-ededed)",
                      }
                    }}
                    to="compare"
                    className="d-flex align-items-center gap-10"
                  >
                    <Badge
                      badgeContent={compareProducts?.length}
                      color="warning"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <CompareIcon />
                    </Badge>
                    <p className="mb-0">Compare</p>
                  </NavLink>
                </NavItemWrapper>
                <NavItemWrapper>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        fontSize: "18px",
                        color: isActive
                          ? "var(--color-febd69)"
                          : "var(--color-ededed)",
                      }
                    }}
                    to="favorite"
                    className="d-flex align-items-center gap-10"
                  >
                    <Badge
                      badgeContent={favoriteProducts?.length}
                      color="warning"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <FavoriteIcon />
                    </Badge>
                    <p className="mb-0">Favorite</p>
                  </NavLink>
                </NavItemWrapper>
                {isLogin ? (
                  <NavItemWrapper>
                    <NavLink
                      style={({ isActive }) => {
                        return {
                          fontSize: isActive ? "16px" : "14px",
                          fontWeight: isActive ? "bolder" : "",
                          color: isActive
                            ? "var(--color-febd69)"
                            : "var(--color-ededed)",
                        }
                      }}
                      to={"/cart"}
                      className="d-flex align-items-center gap-10"
                    >
                      <Badge
                        badgeContent={cartProducts?.length}
                        color="warning"
                      >
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </NavLink>
                    {/* <ModalForm /> */}
                  </NavItemWrapper>
                ) : (
                  <ModalForm />
                )}

                {isLogin ? (
                  <UserLoggedInMenu />
                ) : (
                  <NavItemWrapper>
                    <NavLink
                      style={({ isActive }) => {
                        return {
                          fontSize: "18px",
                          color: isActive
                            ? "var(--color-febd69)"
                            : "var(--color-ededed)",
                        }
                      }}
                      to="login"
                      className="d-flex align-items-center gap-10"
                    >
                      <PersonIcon />
                      <p className="mb-0">Login</p>
                    </NavLink>
                  </NavItemWrapper>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </HeaderUpperContainer>
      <HeaderBottomContainer className="py-3">
        <Container fluid="xxl">
          <Row className="align-items-center">
            <Col xs={12}>
              <MenuBottom className="d-flex align-items-center gap-30 justify-content-between">
                <Dropdown>
                  <DropdownToggle
                    className="bg-transparent border-0 gap-15 d-flex align-items-center"
                    variant="success"
                    id="dropdown-basic"
                    size="lg"
                  >
                    <img src={images.menu} alt="menu" />
                    <span className="me-5 d-inline-block">Shop categories</span>
                  </DropdownToggle>

                  <DropdownMenu>
                    {categoriesList?.map((category) => (
                      <DropdownItem
                        key={category.id}
                        onClick={() => {
                          dispatch(getProductsInCategory(category?.id))
                          navigate(`products/${category?.category}`)
                        }}
                      >
                        {category?.category}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <MenuLink className="flex-grow-1">
                  <div className="d-flex align-items-center gap-15">
                    {navOption.map((link, index) => (
                      <StyledNavLink
                        onClick={() => {
                          if (link?.title === "Our Store") {
                            dispatch(getProducts())
                          }
                        }}
                        key={index}
                        to={link.to}
                        style={({ isActive }) => {
                          return {
                            fontSize: "16px",
                            color: isActive
                              ? "var(--color-febd69)"
                              : "var(--color-ededed)",
                          }
                        }}
                      >
                        {link.title}
                      </StyledNavLink>
                    ))}
                  </div>
                </MenuLink>
                <div>
                  <SearchBarForm />
                </div>
              </MenuBottom>
            </Col>
          </Row>
        </Container>
      </HeaderBottomContainer>
    </AppBar>
  )
}
