import { AxiosInstance } from "axios";
import processApiError from "../util/response.util";
import { AssignRequest, AvailabilityRequest } from "./ondemand.types";

export default class OnDemandDeliveryService {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getServices() {
    try {
      const response = await this.client.get("on-demand/services");
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async getEstimate(orderId: number) {
    try {
      const response = await this.client.get(`/on-demand/estimate/${orderId}`);
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async assignToOnDemand(assignOnDemandRequest: AssignRequest) {
    const getRequestBody = () => {
      return {
        name: assignOnDemandRequest.name,
        orderId: assignOnDemandRequest.orderId,
        ...(assignOnDemandRequest.tip !== null && {
          tip: assignOnDemandRequest.tip,
        }),
        ...(assignOnDemandRequest.estimateReference !== null && {
          estimateReference: assignOnDemandRequest.estimateReference,
        }),
      };
    };

    try {
      const response = await this.client.post(
        "/on-demand/assign",
        getRequestBody(),
      );
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async getDetails(orderId: number) {
    try {
      const response = await this.client.get(`on-demand/details/${orderId}`);
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async cancelAssignment(orderId: number) {
    try {
      const response = await this.client.post(`on-demand/cancel/${orderId}`);
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async checkAvailability(availabilityRequest: AvailabilityRequest) {
    const getRequestBody = () => {
      const deliveryTimeInISO8601 = availabilityRequest.deliveryTime
        ? availabilityRequest.deliveryTime.toISOString()
        : null;

      return {
        pickupAddress: availabilityRequest.pickupAddress,
        deliveryAddress: availabilityRequest.deliveryAddress,
        ...(deliveryTimeInISO8601 !== null && {
          deliveryTime: deliveryTimeInISO8601,
        }),
      };
    };

    try {
      const response = await this.client.post(
        "third-party/availability",
        getRequestBody(),
      );
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }
}
