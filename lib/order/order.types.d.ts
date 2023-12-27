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
export declare const CardType: {
    readonly VISA: "visa";
    readonly MASTERCARD: "master_card";
    readonly AMEX: "AMEX";
    readonly OTHER: "other";
};
export type CardType = typeof CardType;
export declare const OrderState: {
    readonly ALREADY_DELIVERED: "ALREADY_DELIVERED";
    readonly NOT_ASSIGNED: "NOT_ASSIGNED";
    readonly NOT_ACCEPTED: "NOT_ACCEPTED";
    readonly NOT_STARTED_YET: "NOT_STARTED_YET";
    readonly STARTED: "STARTED";
    readonly PICKED_UP: "PICKED_UP";
    readonly READY_TO_DELIVER: "READY_TO_DELIVER";
    readonly FAILED_DELIVERY: "FAILED_DELIVERY";
    readonly ACTIVE: "ACTIVE";
    readonly INCOMPLETE: "INCOMPLETE";
};
export type OrderState = typeof OrderState;
export declare const PaymentMethod: {
    readonly CASH: "cash";
    readonly CREDIT_CARD: "credit_card";
};
export type PaymentMethod = typeof PaymentMethod;
export type OrderQuery = {
    startTime?: Date;
    endTime?: Date;
    orderStatus?: OrderState;
    startCursor?: number;
    endCursor?: number;
};
//# sourceMappingURL=order.types.d.ts.map