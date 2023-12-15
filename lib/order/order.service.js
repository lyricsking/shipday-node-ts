"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = __importDefault(require("../util/response.util"));
const yyyy_mm_dd_regex = /^\d{4}-\d{2}-\d{2}$/;
const hh_mm_ss_regex = /^(?:2[0-3]|[01]\d):[0-5]\d:[0-5]\d$/;
class OrderService {
    constructor(client) {
        this.client = client;
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get("orders");
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    getOrderDetails(orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!orderNumber)
                throw new Error("order number is null");
            try {
                const response = yield this.client.get(`orders/${orderNumber}`);
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    getOrderQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = this.getQueryRequestBody(query);
            try {
                const response = yield this.client.post(`orders/query`, requestBody);
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!orderId)
                throw new Error("order id is null");
            if (typeof orderId !== "number") {
                throw new Error("order id is not number");
            }
            try {
                yield this.client.delete(`/orders/${orderId}`);
                return "OK";
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    assignOrder(orderId, carrierId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.put(`/orders/assign/${orderId}/${carrierId}`);
                return "OK";
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    insertOrder(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = this.getOrderRequestBody(orderInfo);
            if (requestBody.orderId)
                throw new Error("should not have any order id during insert");
            try {
                const response = yield this.client.post("orders", requestBody);
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    editOrder(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = this.getOrderRequestBody(orderInfo);
            if (!requestBody.orderId)
                throw new Error("order must have id to edit");
            try {
                const response = yield this.client.put(`order/edit/${requestBody.orderId}`, requestBody);
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    getOrderRequestBody(order) {
        if (!order.orderNumber)
            throw new Error("order number required");
        if (!order.customerName || typeof order.customerName !== "string")
            throw new Error("invalid customer name");
        if (order.customerAddress || typeof order.customerAddress !== "string")
            throw new Error("invalid customer address");
        if (!order.customerAddress && !order.dropOffAddress)
            throw new Error("A valid customer address must be provided");
        if (!order.customerEmail || typeof order.customerEmail !== "string")
            throw new Error("invalid customer email");
        if (!order.customerPhoneNumber ||
            typeof order.customerPhoneNumber !== "string")
            throw new Error("invalid customer phone number");
        if (!order.restaurantName || typeof order.restaurantName !== "string")
            throw new Error("invalid restaurant name");
        if (order.restaurantAddress || typeof order.restaurantAddress !== "string")
            throw new Error("invalid restaurant address");
        if (!order.restaurantAddress && !order.pickupAddress)
            throw new Error("A valid pickup address must be provided");
        if (order.expectedDeliveryDate &&
            !order.expectedDeliveryDate.match(yyyy_mm_dd_regex)) {
            throw new Error("delivery date not in YYYY-MM-DD format");
        }
        if (order.expectedPickupTime &&
            !order.expectedPickupTime.match(hh_mm_ss_regex)) {
            throw new Error("pickup time not in hh:mm:ss format");
        }
        if (order.expectedDeliveryTime &&
            !order.expectedDeliveryTime.match(hh_mm_ss_regex)) {
            throw new Error("delivery time not in hh:mm:ss format");
        }
        // Latitude check function
        const isLatitude = (lat) => {
            return isFinite(lat) && Math.abs(lat) <= 90;
        };
        //  Longitude check function
        const isLongitude = (lng) => {
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
        if (order.deliveryInstruction &&
            typeof order.deliveryInstruction != "string") {
            throw new Error("invalid delivery instruction");
        }
        if (order.orderSource && typeof order.orderSource != "string") {
            throw new Error("invalid order source");
        }
        if (order.additionalId && typeof order.additionalId != "string") {
            throw new Error("invalid additional id");
        }
        if (order.clientRestaurantId &&
            typeof order.clientRestaurantId != "number") {
            throw new Error("invalid client restaurant id");
        }
        if (order.lastFour && typeof order.lastFour != "string") {
            throw new Error("invalid card Id, Please coorrect your last four card number");
        }
        if (order.orderItems && order.orderItems.constructor === Array) {
            throw new Error("invalid Order items provided.");
        }
        let requestBody = {
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
            orderItem: order.orderItems,
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
    getQueryRequestBody(query) {
        const startTimeInISO8601 = query.startTime
            ? query.startTime.toISOString()
            : null;
        const endTimeInISO8601 = query.endTime ? query.endTime.toISOString() : null;
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (startTimeInISO8601 !== null && { startTime: startTimeInISO8601 })), (endTimeInISO8601 !== null && { endTime: endTimeInISO8601 })), (query.orderStatus !== null && { orderStatus: query.orderStatus })), (query.startCursor !== null && { startCursor: query.startCursor })), (query.endCursor !== null && { endCursor: query.endCursor }));
    }
}
exports.default = OrderService;
