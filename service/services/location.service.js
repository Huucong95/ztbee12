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
class LocationService {
    constructor(_sdk) {
        this._sdk = _sdk;
    }
    update(serviceSubject) {
        if (this.sdk !== serviceSubject.sdk) {
            this.sdk = serviceSubject.sdk;
        }
    }
    set sdk(sdk) {
        this._sdk = sdk;
    }
    getListProvinces() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield ((_a = this._sdk) === null || _a === void 0 ? void 0 : _a.api.v1.getProvince());
                const provinces = yield (response === null || response === void 0 ? void 0 : response.json());
                return provinces;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    getListDistricts(provinceId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield ((_a = this._sdk) === null || _a === void 0 ? void 0 : _a.api.v1.getDistricts(provinceId));
                const districts = yield (response === null || response === void 0 ? void 0 : response.json());
                return districts;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    getListWards(districtId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield ((_a = this._sdk) === null || _a === void 0 ? void 0 : _a.api.v1.getWards(districtId));
                const wards = yield (response === null || response === void 0 ? void 0 : response.json());
                return wards;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
}
exports.default = LocationService;
