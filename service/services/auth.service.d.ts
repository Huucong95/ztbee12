import SdkClientService from ".";
import { LoginModel, RegisterAccountDTO } from "../api";
import SdkClientApi from "../common/sdk.client";
import ServiceObserver from "../models/observer/service_observer";
export declare type LoginType = "normal" | "facebook" | "google";
export interface LoginResponse {
    data: {
        token: string;
    };
    message: string;
    status: number;
}
export interface IAuthService extends ServiceObserver {
    login(loginRequest: LoginModel, loginType: LoginType): Promise<LoginResponse>;
    register(registerRequest: RegisterAccountDTO): Promise<any>;
}
export default class AuthService implements IAuthService {
    private _partnerId;
    private _sdk;
    constructor(_partnerId: string, _sdk: SdkClientApi);
    get partnerId(): string;
    set partnerId(partnerId: string);
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    update(serviceSubject: SdkClientService): void;
    login(loginRequest: LoginModel, loginType: LoginType): Promise<LoginResponse>;
    register(registerRequest: RegisterAccountDTO): Promise<any>;
}
