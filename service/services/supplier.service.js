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
class SupplierService {
    constructor(_partnerId, _sdk) {
        this._partnerId = _partnerId;
        this._sdk = _sdk;
    }
    set partnerId(partnerId) {
        this._partnerId = partnerId;
    }
    get partnerId() {
        return this._partnerId;
    }
    set sdk(sdk) {
        this.sdk = sdk;
    }
    get sdk() {
        return this._sdk;
    }
    getSuppliersFollowPartnerIds(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (yield this.sdk.api.v1.GetListSupplierByPartnerIds(body)).json();
            return response;
        });
    }
    getSupplierByPartnerId(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (yield this.sdk.api.v1.GetListSupplierByPartnerId(this.partnerId, Object.assign({}, query))).json();
            return response;
        });
    }
    update(serviceSubject) {
        this.partnerId !== serviceSubject.partnerId &&
            (this.partnerId = serviceSubject.partnerId);
        this.sdk !== serviceSubject.sdk && (this.sdk = serviceSubject.sdk);
    }
}
exports.default = SupplierService;
