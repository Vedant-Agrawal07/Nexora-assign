export const deliveryOptions = [
  {
    id: "1",
    delivery_days: 7,
    price: 0,
  },
  {
    id: "2",
    delivery_days: 3,
    price: 499,
  },
  {
    id: "3",
    delivery_days: 1,
    price: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  const option = deliveryOptions.find((opt) => opt.id === deliveryOptionId);
  return option || deliveryOptions[0];
}
