import { AxiosInstance } from "axios";
import { CarrierRequest } from "./carrier.request";
export default class CarrierService {
    client: AxiosInstance;
    constructor(client: AxiosInstance);
    getCarriers(): Promise<any>;
    addCarrier(carrierRequest: CarrierRequest): Promise<any>;
    deleteCarrier(carrierId: string): Promise<"OK" | undefined>;
}
//# sourceMappingURL=carrier.service.d.ts.map