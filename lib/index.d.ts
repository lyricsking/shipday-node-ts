import { AxiosInstance } from "axios";
import OrderService from "./order/order.service";
import CarrierService from "./carrier/carrier.service";
import OnDemandService from "./ondemand.delivery/on.demand.delivery.service";
export default class Shipday {
    axiosClient: AxiosInstance;
    orderService: OrderService;
    carrierService: CarrierService;
    onDemandService: OnDemandService;
    constructor(apiKey: string, timeout?: number);
    sayHello(): string;
}
//# sourceMappingURL=index.d.ts.map