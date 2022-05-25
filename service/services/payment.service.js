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
class PayMentService {
    constructor(_partnerId, _store_channel, _sdk) {
        this._partnerId = _partnerId;
        this._store_channel = _store_channel;
        this._sdk = _sdk;
    }
    update(serviceSubject) {
        if (this.sdk !== serviceSubject.sdk) {
            this.sdk = serviceSubject.sdk;
        }
        if (this.partnerId !== serviceSubject.partnerId) {
            this.partnerId = serviceSubject.partnerId;
        }
        if (this.store_channel !== serviceSubject.storeChannel) {
            this.store_channel = serviceSubject.storeChannel;
        }
    }
    get partnerId() {
        return this._partnerId;
    }
    set partnerId(partnerId) {
        this._partnerId = partnerId;
    }
    get store_channel() {
        return this._store_channel;
    }
    set store_channel(store_channel) {
        this._store_channel = store_channel;
    }
    set sdk(sdk) {
        this._sdk = sdk;
    }
    get sdk() {
        return this._sdk;
    }
    getPaymentServices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getPaymentMethods(this.partnerId, this.store_channel);
                const res_json = yield response.json();
                const payment_methods = res_json.data;
                return payment_methods;
            }
            catch (error) {
                return (yield error.json()).response;
            }
        });
    }
}
exports.default = PayMentService;
