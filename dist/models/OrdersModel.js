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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { connection } from "../database/Config";
const PrismaConnection_1 = __importDefault(require("../database/PrismaConnection"));
const OrdersModel = {
    getAllOrders: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = PrismaConnection_1.default.orders.findMany({
            include: {
                order_details: true
            }
        });
        //const [result] = await connection.query('SELECT * FROM orders');
        return result;
    }),
    getOrder: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = PrismaConnection_1.default.orders.findUnique({
            where: {
                id: id,
            },
        });
        //const [result] = await connection.query(`SELECT * FROM orders WHERE id = ${id}`);
        return result;
    }),
    createOrder: (body) => __awaiter(void 0, void 0, void 0, function* () {
        //
        body.order_date = new Date();
        body.order_details = {
            create: body.order_details,
        };
        const result = PrismaConnection_1.default.orders.create({
            data: body,
        });
        //const [result] = await connection.query(`INSERT INTO orders (name, price, description, image, create_date, units_stock, user_id) VALUES ('${name}', ${price}, '${description}', '${image}', '${create_date}', ${units_stock}, '${user_id}')`);
        return result;
    }),
    updateOrder: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        body.create_date = new Date();
        const result = PrismaConnection_1.default.orders.update({
            where: { id: id },
            data: body,
        });
        //const [result] = await connection.query(`UPDATE orders SET name = '${name}', price = ${price}, description = '${description}', image = '${image}', category = '${category}', create_date = '${create_date}', units_stock = ${units_stock} WHERE id = ${id}`);
        return result;
    }),
    deleteOrder: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = PrismaConnection_1.default.orders.delete({
            where: { id: id },
        });
        //const [result] = await connection.query(`DELETE FROM orders WHERE id = ${id}`);
        return result;
    }),
};
exports.default = OrdersModel;
