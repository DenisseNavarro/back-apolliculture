"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrdersDetailsController_1 = __importDefault(require("../controllers/OrdersDetailsController"));
const OrdersDetailsRouter = (0, express_1.Router)();
OrdersDetailsRouter.route("/").get(OrdersDetailsController_1.default.getAllOrderDetails);
OrdersDetailsRouter.route("/:id").get(OrdersDetailsController_1.default.getOrderDetail);
//proteccion de conexion
OrdersDetailsRouter.route("/").post(OrdersDetailsController_1.default.addOrderDetail);
OrdersDetailsRouter.route("/:id").put(OrdersDetailsController_1.default.updateOrderDetail);
OrdersDetailsRouter.route("/:id").delete(OrdersDetailsController_1.default.deleteOrderDetail);
exports.default = OrdersDetailsRouter;
