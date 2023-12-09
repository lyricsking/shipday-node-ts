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
class OnDemandDeliveryService {
    constructor(client) {
        this.client = client;
    }
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get("on-demand/services");
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    getEstimate(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get(`/on-demand/estimate/${orderId}`);
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    assignToOnDemand(assignOnDemandRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequestBody = () => {
                return Object.assign(Object.assign({ name: assignOnDemandRequest.name, orderId: assignOnDemandRequest.orderId }, (assignOnDemandRequest.tip !== null && {
                    tip: assignOnDemandRequest.tip,
                })), (assignOnDemandRequest.estimateReference !== null && {
                    estimateReference: assignOnDemandRequest.estimateReference,
                }));
            };
            try {
                const response = yield this.client.post("/on-demand/assign", getRequestBody());
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    getDetails(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get(`on-demand/details/${orderId}`);
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    cancelAssignment(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.post(`on-demand/cancel/${orderId}`);
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
    checkAvailability(availabilityRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequestBody = () => {
                const deliveryTimeInISO8601 = availabilityRequest.deliveryTime
                    ? availabilityRequest.deliveryTime.toISOString()
                    : null;
                return Object.assign({ pickupAddress: availabilityRequest.pickupAddress, deliveryAddress: availabilityRequest.deliveryAddress }, (deliveryTimeInISO8601 !== null && {
                    deliveryTime: deliveryTimeInISO8601,
                }));
            };
            try {
                const response = yield this.client.post("third-party/availability", getRequestBody());
                return response.data;
            }
            catch (e) {
                (0, response_util_1.default)(e);
            }
        });
    }
}
exports.default = OnDemandDeliveryService;
