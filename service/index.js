"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const services_1 = require("./services");
const models_1 = require("./models");
exports.Model = models_1.default;
exports.default = services_1.default;
const service = new services_1.default("https://api-dev.ecomos.vn:8443/gateway-service/v1", "ECOMOSTM", "website-liquid");
// service.productService.getProducts().then(console.log);
// service.supplierService
//   .getSupplierByPartnerId({ maxResult: 30, currentPage: 2 })
//   .then((data) => console.log(data.data));
// service.productService.getProducts().then(console.log);
// service.productService.getProductById("1").then(console.log);
// service.authService
//   .register({
//     email: "tphong.shopify@yopmail.com",
//     fullName: "Tien Phong",
//     password: "abcd@1234",
//     phone: "0365313045",
//     platform: "WEB",
//     url_active_account: "",
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// service.locationService.getListProvinces().then(console.log).catch(console.log);
