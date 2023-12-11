import { AxiosInstance } from "axios";
import { AssignRequest, AvailabilityRequest } from "./ondemand.types";
export default class OnDemandDeliveryService {
    client: AxiosInstance;
    constructor(client: AxiosInstance);
    getServices(): Promise<any>;
    getEstimate(orderId: number): Promise<any>;
    assignToOnDemand(assignOnDemandRequest: AssignRequest): Promise<any>;
    getDetails(orderId: string): Promise<any>;
    cancelAssignment(orderId: string): Promise<any>;
    checkAvailability(availabilityRequest: AvailabilityRequest): Promise<any>;
}
//# sourceMappingURL=on.demand.delivery.service.d.ts.map