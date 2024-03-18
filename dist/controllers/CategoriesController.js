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
exports.CategoriesController = void 0;
const CategoriesModel_1 = __importDefault(require("../models/CategoriesModel"));
exports.CategoriesController = {
    getAllCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield CategoriesModel_1.default.getAllCategories();
            res.json(categories);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the categories' });
        }
    }),
    getCategorie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryId = req.params.id;
            const categories = yield CategoriesModel_1.default.getCategorie(categoryId);
            if (!categories || categories.length === 0) {
                res.status(404).json({ message: `The categories with id ${categoryId} has not found` });
                return;
            }
            res.json(categories);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the categories' });
        }
    }),
    addCategorie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description } = req.body;
            if (!name || !description) {
                res.status(400).json({ message: 'Please enter the categories informatio' });
                return;
            }
            yield CategoriesModel_1.default.createCategorie(name, description);
            res.status(201).json({ message: 'Categories created correctly!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error creating this categories' });
        }
    }),
    updateCategorie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { name, description } = req.body;
            if (!name || !description) {
                res.status(400).json({ message: 'Please enter all categories information' });
                return;
            }
            yield CategoriesModel_1.default.updateCategorie(id, name, description);
            res.status(200).json({ message: 'Categories up to date!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error while Updating the categories' });
        }
    }),
    deleteCategorie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield CategoriesModel_1.default.deleteCategorie(id);
            res.status(200).json({ message: 'Categories successfully deleted' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error deleting the categories' });
        }
    }),
};
exports.default = exports.CategoriesController;
