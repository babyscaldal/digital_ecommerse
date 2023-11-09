import { ReactNode } from "react"
import "./GlobalStyle.scss"

interface IGlobalStyles {
  children: ReactNode
}
function GlobalStyles({ children }: IGlobalStyles) {
  return children
}

export default GlobalStyles
