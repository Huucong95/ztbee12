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
class CustomerService {
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
    getCustomerInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getCustomerInfo(this.partnerId, {
                    headers: {
                        "X-Ecomos-Access-Token": `${token}`,
                    },
                });
                const rs = yield response.json();
                return rs.data;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(err);
            }
        });
    }
    register(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.register(this.partnerId, requestBody);
                const rs = yield response.json();
                return rs;
            }
            catch (error) {
                const err = yield error.json();
                throw new Error(err);
            }
        });
    }
    changePassword(token, changePasswordRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.changePassword(this.partnerId, changePasswordRequest, {
                    headers: {
                        "X-Ecomos-Access-Token": token,
                    },
                });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    sendCodeActiveAgain(email, boby) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.sendCodeActive(boby, { email });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    activeAccount(body, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.activeAccount(this.partnerId, body, {
                    email,
                });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    getListAddresses(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getAddresses(this.partnerId, {
                    headers: {
                        "X-Ecomos-Access-Token": token,
                    },
                });
                const rs = yield response.json();
                return rs.data;
            }
            catch (error) {
                const err = yield error.json();
                throw new Error(err);
            }
        });
    }
    createOrderAddress(body, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.createDeliveryInfo(this.partnerId, body, {
                    headers: {
                        "X-Ecomos-Access-Token": token,
                    },
                });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    updateOrderAddress(body, addressId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.updateDeliveryInfo(this.partnerId, addressId, body, {
                    headers: {
                        "X-Ecomos-Access-Token": token,
                    },
                });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    recievedItem(orderId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.itemReceived(orderId, {
                    headers: {
                        "X-Ecomos-Access-Token": token,
                    },
                });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    updateCustomerInfo(token, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.updateUserInfo(body, {
                    headers: {
                        "X-Ecomos-Access-Token": token,
                    },
                });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    forgotPassword(partnerId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.forgotPassword(partnerId, body);
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
    resetPassword(email, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.resetPassword(this.partnerId, body, {
                    email,
                });
                const rs = yield response.json();
                return rs.message;
            }
            catch (error) {
                const err = yield error.json();
                console.log(err);
                throw new Error(error);
            }
        });
    }
}
exports.default = CustomerService;
