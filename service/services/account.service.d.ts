import { ChangePasswordDTO, RegisterAccountDTO, ActiveAccountDTO, SendCodeActiveDTO, Address, Customer as CustomerRequestUpdate, ForgotPasswordDTO, ResetPasswordDTO } from "./../api";
import Customer from "../models/customer";
import AddressShopify from "../models/address";
import SdkClientApi from "../common/sdk.client";
import ServiceObserver from "../models/observer/service_observer";
import SdkClientService from ".";
export interface ICustomertService extends ServiceObserver {
    getCustomerInfo(token: string): Promise<Customer>;
    updateCustomerInfo(token: string, body: CustomerRequestUpdate): Promise<string>;
    changePassword(token: string, changePasswordRequest: ChangePasswordDTO): Promise<string>;
    register(requestBody: RegisterAccountDTO, partnerId: string): Promise<{
        status: number;
        message: string;
    }>;
    sendCodeActiveAgain(email: string, body: SendCodeActiveDTO): Promise<string>;
    activeAccount(body: ActiveAccountDTO, email: string): Promise<string>;
    recievedItem(orderId: string, token: string): Promise<string>;
    getListAddresses(token: string): Promise<Address[]>;
    createOrderAddress(body: Address, token: string): Promise<string>;
    updateOrderAddress(body: Address, addressId: string, token: string): Promise<string>;
    forgotPassword(partnerId: string, body: ForgotPasswordDTO): Promise<string>;
    resetPassword(email: string, body: ResetPasswordDTO): Promise<string>;
}
export default class CustomerService implements ICustomertService {
    private _partnerId;
    private _sdk;
    constructor(_partnerId: string, _sdk: SdkClientApi);
    set partnerId(partnerId: string);
    get partnerId(): string;
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    update(serviceSubject: SdkClientService): void;
    getCustomerInfo(token: string): Promise<Customer>;
    register(requestBody: RegisterAccountDTO): Promise<{
        status: number;
        message: string;
    }>;
    changePassword(token: string, changePasswordRequest: ChangePasswordDTO): Promise<string>;
    sendCodeActiveAgain(email: string, boby: SendCodeActiveDTO): Promise<string>;
    activeAccount(body: ActiveAccountDTO, email: string): Promise<string>;
    getListAddresses(token: string): Promise<AddressShopify[]>;
    createOrderAddress(body: Address, token: string): Promise<string>;
    updateOrderAddress(body: Address, addressId: string, token: string): Promise<string>;
    recievedItem(orderId: string, token: string): Promise<string>;
    updateCustomerInfo(token: string, body: CustomerRequestUpdate): Promise<string>;
    forgotPassword(partnerId: string, body: ForgotPasswordDTO): Promise<string>;
    resetPassword(email: string, body: ResetPasswordDTO): Promise<string>;
}
