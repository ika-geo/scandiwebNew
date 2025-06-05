
export const CREATE_ORDER = `mutation CreateOrder($order: [OrderItemInput]!) {
  createOrder(order: $order)
}`