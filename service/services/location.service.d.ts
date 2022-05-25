import SdkClientService from ".";
import SdkClientApi from "../common/sdk.client";
import ServiceObserver from "../models/observer/service_observer";
import { District, Province, Ward } from "../models/response";
export interface ILocationService extends ServiceObserver {
    getListProvinces(): Promise<Province[]>;
    getListDistricts(provinceId: string): Promise<District[]>;
    getListWards(districtId: string): Promise<Ward[]>;
}
declare class LocationService implements ILocationService {
    private _sdk?;
    constructor(_sdk?: SdkClientApi | undefined);
    update(serviceSubject: SdkClientService): void;
    set sdk(sdk: SdkClientApi);
    getListProvinces(): Promise<Province[]>;
    getListDistricts(provinceId: string): Promise<District[]>;
    getListWards(districtId: string): Promise<Ward[]>;
}
export default LocationService;
