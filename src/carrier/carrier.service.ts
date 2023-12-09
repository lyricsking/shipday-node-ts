import { AxiosInstance } from "axios";
import processApiError from "../util/response.util";
import { CarrierRequest } from "./carrier.request";

export default class CarrierService {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getCarriers() {
    try {
      const response = await this.client.get("carriers");
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async addCarrier(carrierRequest: CarrierRequest) {
    if (!carrierRequest) throw new Error("carrier info is null");
    try {
      const response = await this.client.post("carriers", carrierRequest);
      return response.data;
    } catch (e) {
      processApiError(e);
    }
  }

  async deleteCarrier(carrierId: string) {
    if (!carrierId) throw new Error("carrier id is null");
    try {
      await this.client.delete(`carriers/${carrierId}`);
      return "OK";
    } catch (e) {
      processApiError(e);
    }
  }
}
