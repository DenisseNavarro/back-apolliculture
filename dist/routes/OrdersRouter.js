"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrdersController_1 = __importDefault(require("../controllers/OrdersController"));
const OrdersRouter = (0, express_1.Router)();
OrdersRouter.route("/").get(OrdersController_1.default.getAllOrders);
OrdersRouter.route("/:id").get(OrdersController_1.default.getOrder);
//proteccion de conexion
OrdersRouter.route("/").post(OrdersController_1.default.addOrder);
OrdersRouter.route("/:id").put(OrdersController_1.default.updateOrder);
OrdersRouter.route("/:id").delete(OrdersController_1.default.deleteOrder);
exports.default = OrdersRouter;
