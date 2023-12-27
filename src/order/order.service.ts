import { AxiosInstance } from "axios";
import processApiError from "../util/response.util";
import { OrderQuery, OrderRequest } from "./order.types";

const yyyy_mm_dd_regex = /^\d{4}-\d{2}-\d{2}$/;
const hh_mm_ss_regex = /^(?:2[0-3]|[01]\d):[0-5]\d:[0-5]\d$/;

export default class OrderService {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getOrders() {
    try {
      const response = await this.client.get("orders");
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async getOrderDetails(orderNumber: string) {
    if (!orderNumber) throw new Error("order number is null");
    try {
      const response = await this.client.get(`orders/${orderNumber}`);
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async getOrderQuery(query: OrderQuery) {
    const requestBody = this.getQueryRequestBody(query);
    try {
      const response = await this.client.post(`orders/query`, requestBody);
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async deleteOrder(orderId: number) {
    if (!orderId) throw new Error("order id is null");
    if (typeof orderId !== "number") {
      throw new Error("order id is not number");
    }
    try {
      await this.client.delete(`/orders/${orderId}`);
      return "OK";
    } catch (e) {
      processApiError(e);
    }
  }

  async assignOrder(orderId: number, carrierId: number) {
    try {
      await this.client.put(`/orders/assign/${orderId}/${carrierId}`);
      return "OK";
    } catch (e) {
      processApiError(e);
    }
  }

  async insertOrder(orderInfo: OrderRequest) {
    const requestBody = this.getOrderRequestBody(orderInfo);
    if (requestBody.orderId)
      throw new Error("should not have any order id during insert");
    try {
      const response = await this.client.post("orders", requestBody);
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async editOrder(orderInfo: OrderRequest) {
    const requestBody = this.getOrderRequestBody(orderInfo);
    if (!requestBody.orderId) throw new Error("order must have id to edit");
    try {
      const response = await this.client.put(
        `order/edit/${requestBody.orderId}`,
        requestBody,
      );
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  getOrderRequestBody(order: OrderRequest) {
    if (!order.orderNumber) throw new Error("order number required");

    if (!order.customerName || typeof order.customerName !== "string")
      throw new Error("invalid customer name");

    if (order.customerAddress || typeof order.customerAddress !== "string")
      throw new Error("invalid customer address");

    if (!order.customerAddress && !order.dropOffAddress)
      throw new Error("A valid customer address must be provided");

    if (!order.customerEmail || typeof order.customerEmail !== "string")
      throw new Error("invalid customer email");

    if (
      !order.customerPhoneNumber ||
      typeof order.customerPhoneNumber !== "string"
    )
      throw new Error("invalid customer phone number");

    if (!order.restaurantName || typeof order.restaurantName !== "string")
      throw new Error("invalid restaurant name");

    if (order.restaurantAddress || typeof order.restaurantAddress !== "string")
      throw new Error("invalid restaurant address");

    if (!order.restaurantAddress && !order.pickupAddress)
      throw new Error("A valid pickup address must be provided");

    if (
      order.expectedDeliveryDate &&
      !order.expectedDeliveryDate.match(yyyy_mm_dd_regex)
    ) {
      throw new Error("delivery date not in YYYY-MM-DD format");
    }

    if (
      order.expectedPickupTime &&
      !order.expectedPickupTime.match(hh_mm_ss_regex)
    ) {
      throw new Error("pickup time not in hh:mm:ss format");
    }

    if (
      order.expectedDeliveryTime &&
      !order.expectedDeliveryTime.match(hh_mm_ss_regex)
    ) {
      throw new Error("delivery time not in hh:mm:ss format");
    }

    // Latitude check function
    const isLatitude = (lat: number) => {
      return isFinite(lat) && Math.abs(lat) <= 90;
    };

    //  Longitude check function
    const isLongitude = (lng: number) => {
      return isFinite(lng) && Math.abs(lng) <= 180;
    };

    if (order.pickupLatitude && !isLatitude(order.pickupLatitude))
      throw new Error("pickup latitude is invalid");

    if (order.pickupLongitude && !isLongitude(order.pickupLongitude))
      throw new Error("pickup longitude is invalid");

    if (order.deliveryLatitude && !isLatitude(order.deliveryLatitude))
      throw new Error("delivery latitude is invalid");

    if (order.deliveryLongitude && !isLongitude(order.deliveryLongitude))
      throw new Error("delivery longitude is invalid");

    if (order.deliveryFee && typeof order.deliveryFee != "number") {
      throw new Error("invalid delivery fee");
    }

    if (order.orderCost && typeof order.orderCost === "number") {
      throw new Error("invalid order cost");
    }

    if (
      order.deliveryInstruction &&
      typeof order.deliveryInstruction != "string"
    ) {
      throw new Error("invalid delivery instruction");
    }

    if (order.orderSource && typeof order.orderSource != "string") {
      throw new Error("invalid order source");
    }

    if (order.additionalId && typeof order.additionalId != "string") {
      throw new Error("invalid additional id");
    }

    if (
      order.clientRestaurantId &&
      typeof order.clientRestaurantId != "number"
    ) {
      throw new Error("invalid client restaurant id");
    }

    if (order.lastFour && typeof order.lastFour != "string") {
      throw new Error(
        "invalid card Id, Please coorrect your last four card number",
      );
    }

    if (order.orderItem && Array.isArray(order.orderItem)) {
      throw new Error("invalid Order items provided.");
    }

    let requestBody: Record<string, any> = {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerAddress: order.customerAddress,
      customerEmail: order.customerEmail,
      customerPhoneNumber: order.customerPhoneNumber,
      restaurantName: order.restaurantName,
      restaurantAddress: order.restaurantAddress,
      restaurantPhoneNumber: order.restaurantPhoneNumber,
      orderId: order.orderId,
      expectedDeliveryDate: order.expectedDeliveryDate,
      expectedPickupTime: order.expectedPickupTime,
      expectedDeliveryTime: order.expectedDeliveryTime,
      pickupLatitude: order.pickupLatitude,
      pickupLongitude: order.pickupLongitude,
      deliveryLatitude: order.deliveryLatitude,
      deliveryLongitude: order.deliveryLongitude,
      orderItem: order.orderItem,
      tips: order.tips,
      tax: order.tax,
      discountAmount: order.discountAmount,
      deliveryFee: order.deliveryFee,
      totalOrderCost: order.orderCost,
      deliveryInstruction: order.deliveryInstruction,
      orderSource: order.orderSource,
      additionalId: order.additionalId,
      clientRestaurantId: order.clientRestaurantId,
      paymentMethod: order.paymentOption,
      creditCardType: order.cardType,
      creditCardId: order.lastFour,
      pickup: order.pickupAddress,
      dropoff: order.dropOffAddress,
    };

    Object.keys(requestBody).forEach((key) => {
      if (requestBody[key] === null || requestBody[key] === undefined)
        delete requestBody[key];
    });

    return requestBody;
  }

  getQueryRequestBody(query: OrderQuery) {
    const startTimeInISO8601 = query.startTime
      ? query.startTime.toISOString()
      : null;
    const endTimeInISO8601 = query.endTime ? query.endTime.toISOString() : null;
    return {
      ...(startTimeInISO8601 !== null && { startTime: startTimeInISO8601 }),
      ...(endTimeInISO8601 !== null && { endTime: endTimeInISO8601 }),
      ...(query.orderStatus !== null && { orderStatus: query.orderStatus }),
      ...(query.startCursor !== null && { startCursor: query.startCursor }),
      ...(query.endCursor !== null && { endCursor: query.endCursor }),
    };
  }
}
