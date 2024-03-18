"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CloudinaryRoutes.ts
const express_1 = require("express");
const CloudynaryController_1 = require("../controllers/CloudynaryController");
const multer_1 = __importDefault(require("multer"));
const CloudinaryRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
CloudinaryRouter.post('/upload', upload.single('image'), CloudynaryController_1.uploadImageController);
exports.default = CloudinaryRouter;
