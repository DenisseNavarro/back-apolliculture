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
const ProductsModel_1 = __importDefault(require("../models/ProductsModel"));
const ProductsController = {
    getAllProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield ProductsModel_1.default.getAllProducts();
            res.json(products);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the product' });
        }
    }),
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const productId = req.params.id;
            const product = yield ProductsModel_1.default.getProduct(productId);
            if (!product) {
                res.status(404).json({ message: `The product with id ${productId} has not found` });
                return;
            }
            res.json(product);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the product' });
        }
    }),
    addProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, price, description, image, units_stock, user_id } = req.body;
            if (!name || !price || !description || !image || !units_stock || !user_id) {
                res.status(400).json({ message: 'Please enter the product information' });
                return;
            }
            yield ProductsModel_1.default.createProduct(req.body);
            res.status(201).json({ message: 'Product created correctly' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error creating this product' });
        }
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { name, price, description, image, units_stock } = req.body;
            if (!name || !price || !description || !image || !units_stock) {
                res.status(400).json({ message: 'Please enter all product information' });
                return;
            }
            yield ProductsModel_1.default.updateProduct(id, req.body);
            res.status(200).json({ message: 'Product up to date!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error while Updating the product' });
        }
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield ProductsModel_1.default.deleteProduct(id);
            res.status(200).json({ message: 'Product successfully deleted' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error deleting the product' });
        }
    }),
};
exports.default = ProductsController;
