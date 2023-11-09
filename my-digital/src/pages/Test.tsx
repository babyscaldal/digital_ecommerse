import Tippy from "@tippyjs/react"
import React from "react"
import styled from "styled-components"

const Wrapper = styled.section`
  padding-top: 160px;
  background-color: var(--color-f5f5f7);
  display: flex;
  justify-content: center;
`

export default function Test() {
  return (
    <Wrapper>
      {/* <Tippy
        // onClickOutside={handleHideResult}
        visible={showResult}
        interactive
        placement="bottom-end"
        render={(props) => (
          <div tabIndex={-1} {...props}>
            <PopoverContent>
              {searchResultProducts?.map((product) => (
                <SearchResultItem key={product.id} product={product} />
              ))}
            </PopoverContent>
          </div>
        )}
      >
        <input type="text" />
      </Tippy> */}
    </Wrapper>
  )
}
