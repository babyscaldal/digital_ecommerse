import axiosClient from "../../axiosClient"
import { IContact, ISubscribeEmail } from "./contactType"

const contactServices = {
  postContactInfo: async (contactData: IContact) => {
    const POST_CONTACT_INFO_URL =
      "https://digital-ecommerse-api.onrender.com/contacts"
    const response = await axiosClient.post(POST_CONTACT_INFO_URL, contactData)
    return response
  },
  postSubscribeEmailInfo: async (subscribeEmail: ISubscribeEmail) => {
    const POST_Subscribe_EMAIL_INFO_URL =
      "https://digital-ecommerse-api.onrender.com/subscribe"
    const response = await axiosClient.post(
      POST_Subscribe_EMAIL_INFO_URL,
      subscribeEmail,
    )
    return response
  },
}

export default contactServices
