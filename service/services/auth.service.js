"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
class AuthService {
    constructor(_partnerId, _sdk) {
        this._partnerId = _partnerId;
        this._sdk = _sdk;
    }
    get partnerId() {
        return this._partnerId;
    }
    set partnerId(partnerId) {
        this._partnerId = partnerId;
    }
    set sdk(sdk) {
        this._sdk = sdk;
    }
    get sdk() {
        return this._sdk;
    }
    update(serviceSubject) {
        if (this.partnerId !== serviceSubject.partnerId) {
            this.partnerId = serviceSubject.partnerId;
        }
        if (this.sdk !== serviceSubject.sdk) {
            this.sdk = serviceSubject.sdk;
        }
    }
    login(loginRequest, loginType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (loginType === constant_1.LOGIN_TYPE.NORMAL &&
                    (yield this.sdk.api.v1.login(this.partnerId, loginRequest))) ||
                    (loginType === constant_1.LOGIN_TYPE.FACEBOOK &&
                        (yield this.sdk.api.v1.loginFB(this.partnerId, loginRequest))) ||
                    (loginType === constant_1.LOGIN_TYPE.GOOGLE &&
                        (yield this.sdk.api.v1.loginGoogle(this.partnerId, loginRequest)));
                const rs = yield (response === null || response === void 0 ? void 0 : response.json());
                return rs;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    register(registerRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const rs = yield this.sdk.api.v1.register(this.partnerId, registerRequest);
            return rs.json();
        });
    }
}
exports.default = AuthService;
