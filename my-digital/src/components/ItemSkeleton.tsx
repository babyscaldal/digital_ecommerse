import Skeleton from "@mui/material/Skeleton"
import { Stack } from "@mui/material"
import styled from "styled-components"

const SkeletonWrapperCard = styled.div`
  width: 100%;
  height: 358px;
  border-radius: 10px;
`
const SkeletonWrapperList = styled.div`
  width: 100%;
  height: 205px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function SkeletonItemCard() {
  return (
    <>
      <SkeletonWrapperCard>
        <Skeleton variant="rounded" width={"100%"} height="150px" />
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={"100%"} height={"21px"} />
          <Skeleton variant="rounded" width={"100%"} height={"21px"} />
          <Skeleton variant="rounded" width={"100%"} height={"28px"} />
          <Skeleton variant="rounded" width={"100%"} height={"21px"} />
          <Skeleton variant="rounded" width={"100%"} height={"21px"} />
        </Stack>
      </SkeletonWrapperCard>
    </>
  )
}
