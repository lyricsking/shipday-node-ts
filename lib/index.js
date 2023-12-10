"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiosclient_1 = __importDefault(require("./httpclient/axiosclient"));
const order_service_1 = __importDefault(require("./order/order.service"));
const carrier_service_1 = __importDefault(require("./carrier/carrier.service"));
const on_demand_delivery_service_1 = __importDefault(require("./ondemand.delivery/on.demand.delivery.service"));
__exportStar(require("./carrier/carrier.request"), exports);
__exportStar(require("./ondemand.delivery/ondemand.types"), exports);
__exportStar(require("./order/order.types"), exports);
class Shipday {
    constructor(apiKey, timeout = 1000) {
        this.axiosClient = (0, axiosclient_1.default)(apiKey, timeout);
        this.orderService = new order_service_1.default(this.axiosClient);
        this.carrierService = new carrier_service_1.default(this.axiosClient);
        this.onDemandService = new on_demand_delivery_service_1.default(this.axiosClient);
    }
    sayHello() {
        return "shipday node sdk - v 1.1.0";
    }
}
exports.default = Shipday;
