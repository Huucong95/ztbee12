"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
class SdkClientApi {
    constructor(baseUrl) {
        this.api = new api_1.Api({
            baseUrl,
        });
    }
    static create(config) {
        return new api_1.Api(config);
    }
}
exports.default = SdkClientApi;
