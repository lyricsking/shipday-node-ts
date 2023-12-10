import { AxiosInstance } from "axios";
import { OrderQuery, OrderRequest } from "./order.types";
export default class OrderService {
    client: AxiosInstance;
    constructor(client: AxiosInstance);
    getOrders(): Promise<any>;
    getOrderDetails(orderNumber: string): Promise<any>;
    getOrderQuery(query: OrderQuery): Promise<any>;
    deleteOrder(orderId: number): Promise<"OK" | undefined>;
    assignOrder(orderId: number, carrierId: number): Promise<"OK" | undefined>;
    insertOrder(orderInfo: OrderRequest): Promise<any>;
    editOrder(orderInfo: OrderRequest): Promise<any>;
    getOrderRequestBody(order: OrderRequest): Record<string, any>;
    getQueryRequestBody(query: OrderQuery): {
        endCursor?: number | undefined;
        startCursor?: number | undefined;
        orderStatus?: {
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
        } | undefined;
        endTime?: string | undefined;
        startTime?: string | undefined;
    };
}
//# sourceMappingURL=order.service.d.ts.map