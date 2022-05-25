"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Product from './product';
// export default class Cart {
//   constructor(init?: Partial<Cart>) {
//     Object.assign(this, init);
//   }
//   total_price: number;
//   item_count: number;
//   items: {
//     id: number;
//     title: string;
//     subtitle: string;
//     price: number;
//     line_price: number;
//     quantity: number;
//     variant: any[];
//     product: Product[];
//   };
// }
class Cart {
    constructor(init) {
        Object.assign(this, init);
    }
}
exports.default = Cart;
