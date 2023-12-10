import { AxiosInstance } from "axios";
import axiosConstructor from "./httpclient/axiosclient";
import OrderService from "./order/order.service";
import CarrierService from "./carrier/carrier.service";
import OnDemandService from "./ondemand.delivery/on.demand.delivery.service";

export * from "./carrier/carrier.request";
export * from "./ondemand.delivery/ondemand.types";
export * from "./order/order.types";

export default class Shipday {
  axiosClient: AxiosInstance;
  orderService: OrderService;
  carrierService: CarrierService;
  onDemandService: OnDemandService;

  constructor(apiKey: string, timeout = 1000) {
    this.axiosClient = axiosConstructor(apiKey, timeout);
    this.orderService = new OrderService(this.axiosClient);
    this.carrierService = new CarrierService(this.axiosClient);
    this.onDemandService = new OnDemandService(this.axiosClient);
  }

  sayHello() {
    return "shipday node sdk - v 1.1.0";
  }
}
