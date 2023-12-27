export type OrderRequest = {
  orderId?: number;
  orderNumber: string;
  customerName: string;
  customerAddress?: string;
  customerEmail: string;
  customerPhoneNumber: string;
  restaurantName: string;
  restaurantAddress?: string;
  restaurantPhoneNumber: string;
  expectedDeliveryDate?: string;
  expectedPickupTime?: string;
  expectedDeliveryTime?: string;
  tax?: number;
  tips?: number;
  pickupLatitude?: number;
  pickupLongitude?: number;
  deliveryLatitude?: number;
  deliveryLongitude?: number;
  discountAmount?: number;
  deliveryFee?: number;
  orderCost?: number;
  pickupInstruction?: string;
  deliveryInstruction?: string;
  orderSource?: string;
  additionalId?: string;
  clientRestaurantId?: number;
  paymentOption?: PaymentMethod;
  cardType?: CardType;
  lastFour?: string;
  orderItem?: OrderItem[];
  pickupAddress?: Address;
  dropOffAddress?: Address;
};

export type OrderItem = {
  name: string;
  unitPrice: number;
  quantity: number;
  addOns?: string[];
  detail?: string;
};

export type Address = {
  unit: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export const CardType = {
  VISA: "visa",
  MASTERCARD: "master_card",
  AMEX: "AMEX",
  OTHER: "other",
} as const;
export type CardType = typeof CardType;

export const OrderState = {
  ALREADY_DELIVERED: "ALREADY_DELIVERED",
  NOT_ASSIGNED: "NOT_ASSIGNED",
  NOT_ACCEPTED: "NOT_ACCEPTED",
  NOT_STARTED_YET: "NOT_STARTED_YET",
  STARTED: "STARTED",
  PICKED_UP: "PICKED_UP",
  READY_TO_DELIVER: "READY_TO_DELIVER",
  FAILED_DELIVERY: "FAILED_DELIVERY",
  ACTIVE: "ACTIVE",
  INCOMPLETE: "INCOMPLETE",
} as const;
export type OrderState = typeof OrderState;

export const PaymentMethod = {
  CASH: "cash",
  CREDIT_CARD: "credit_card",
} as const;
export type PaymentMethod = typeof PaymentMethod;

export type OrderQuery = {
  startTime?: Date;
  endTime?: Date;
  orderStatus?: OrderState;
  startCursor?: number;
  endCursor?: number;
};
