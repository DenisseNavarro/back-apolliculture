"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
const sesionMiddelwares_1 = require("../middelwares/sesionMiddelwares");
const ProductsRouter = (0, express_1.Router)();
ProductsRouter.route("/").get(ProductsController_1.default.getAllProducts);
ProductsRouter.route("/:id").get(ProductsController_1.default.getProduct);
//proteccion de conexion
ProductsRouter.route("/").post(sesionMiddelwares_1.isAdmin, ProductsController_1.default.addProduct);
ProductsRouter.route("/:id").put(ProductsController_1.default.updateProduct);
ProductsRouter.route("/:id").delete(ProductsController_1.default.deleteProduct);
exports.default = ProductsRouter;
