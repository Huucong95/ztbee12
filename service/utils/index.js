"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenForOrderWithoutLogin = exports.generateSessionId = void 0;
const crypto_js_1 = require("crypto-js");
const generateSessionId = (length) => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateSessionId = generateSessionId;
const generateTokenForOrderWithoutLogin = (data) => {
    let currentTime = Date.now();
    const query_string = `${data.email},${data.phone},${data.fullName},${currentTime}`;
    const apiSecret = "laTbFOX3J2cghZgL81aw2wIEHYPaMSI3";
    const hashDigest = (0, crypto_js_1.HmacSHA256)(query_string, apiSecret).toString();
    return hashDigest;
};
exports.generateTokenForOrderWithoutLogin = generateTokenForOrderWithoutLogin;
