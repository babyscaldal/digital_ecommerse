import { Box } from "@mui/material"

export default function NotFound() {
  return (
    <Box
      py={"30px"}
      textAlign={"center"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      color="text.primary"
    >
      <h3>Notification</h3>
      <p>You have not added any product yet!!</p>
      <Box height={200} width={200}>
        <img
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png"
          alt="order-nothing"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
  )
}
