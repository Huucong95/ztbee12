import SdkClientService from ".";
import SdkClientApi from "../common/sdk.client";
import ServiceObserver from "../models/observer/service_observer";
import { Payment } from "../models/response";
export interface IPaymentSerive extends ServiceObserver {
    getPaymentServices(): Promise<Payment[]>;
}
export default class PayMentService implements IPaymentSerive {
    private _partnerId;
    private _store_channel;
    private _sdk;
    constructor(_partnerId: string, _store_channel: string, _sdk: SdkClientApi);
    update(serviceSubject: SdkClientService): void;
    get partnerId(): string;
    set partnerId(partnerId: string);
    get store_channel(): string;
    set store_channel(store_channel: string);
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    getPaymentServices(): Promise<Payment[]>;
}
