"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriesController_1 = __importDefault(require("../controllers/CategoriesController"));
const CategoriesRouter = (0, express_1.Router)();
CategoriesRouter.route("/").get(CategoriesController_1.default.getAllCategories);
CategoriesRouter.route("/:id").get(CategoriesController_1.default.getCategorie);
CategoriesRouter.route("/").post(CategoriesController_1.default.addCategorie);
CategoriesRouter.route("/:id").put(CategoriesController_1.default.updateCategorie);
CategoriesRouter.route("/:id").delete(CategoriesController_1.default.deleteCategorie);
exports.default = CategoriesRouter;
