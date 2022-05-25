import { Api, ApiConfig } from "../api";
declare class SdkClientApi {
    api: Api<unknown>;
    constructor(baseUrl: string);
    static create(config: ApiConfig): Api<unknown>;
}
export default SdkClientApi;
