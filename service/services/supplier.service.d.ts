import SdkClientService from ".";
import SdkClientApi from "../common/sdk.client";
import ServiceObserver from "../models/observer/service_observer";
import { SuppliersByPartnerIdQuery } from "../models/request";
import { CustomResponse, SupplierResponseByPartnerId } from "../models/response";
import Supplier from "../models/supplier";
export interface ISupplierService extends ServiceObserver {
    getSuppliersFollowPartnerIds(boby: string[]): Promise<CustomResponse<Supplier[]>>;
    getSupplierByPartnerId(query: Partial<SuppliersByPartnerIdQuery>): Promise<CustomResponse<SupplierResponseByPartnerId>>;
}
export default class SupplierService implements ISupplierService {
    private _partnerId;
    private _sdk;
    constructor(_partnerId: string, _sdk: SdkClientApi);
    set partnerId(partnerId: string);
    get partnerId(): string;
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    getSuppliersFollowPartnerIds(body: string[]): Promise<CustomResponse<Supplier[]>>;
    getSupplierByPartnerId(query?: Partial<SuppliersByPartnerIdQuery>): Promise<CustomResponse<SupplierResponseByPartnerId>>;
    update(serviceSubject: SdkClientService): void;
}
