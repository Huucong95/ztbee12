import SdkClientService from ".";
import SdkClientApi from "../common/sdk.client";
import Collection from "../models/collection";
import ServiceObserver from "../models/observer/service_observer";
/**
 * Interface for UserService
 */
export interface ICollectionService extends ServiceObserver {
    getListCollection(partner_id: string, storeChannel: string): Promise<Collection[]>;
    getCollection(partner_id: string, slug: string, storeChannel: string): Promise<Collection>;
}
export default class CollectionService implements ICollectionService {
    private _partnerId;
    private _sdk;
    constructor(_partnerId: string, _sdk: SdkClientApi);
    update(serviceSubject: SdkClientService): void;
    get partnerId(): string;
    set partnerId(partnerId: string);
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    getListCollection(partner_id: string, storeChannel: string): Promise<Collection[]>;
    getCollection(partner_id: string, storeChannel: string, handle: string): Promise<Collection>;
}
