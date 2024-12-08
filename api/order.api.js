import axios from 'axios'

const BASE_URL = 'http://localhost:5148'
// const BASE_URL = 'http://localhost:5000'
// const BASE_URL = 'https://morrapi20231205153355.azurewebsites.net'

const createOrder = (payload) => {
  const formattedReq = {
    invoiceNumber: payload.invoiceNumber,
    orderId: payload.orderId,
    totalPrice: payload.totalPrice,
    orderItems: payload.orderItems,
  }

  const config = {
    headers: {
      Authorization: payload?.token ? `Bearer ${payload?.token}` : null,
    },
  }

  return axios
    .post(BASE_URL + `/api/Order/saveOrder`, formattedReq, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}
export { createOrder }
