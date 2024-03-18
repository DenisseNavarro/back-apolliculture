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
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../database/Config");
const CategoriesModel = {
    getAllCategories: () => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield Config_1.connection.query('SELECT * FROM categories');
        return result;
    }),
    getCategorie: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield Config_1.connection.query(`SELECT * FROM categories WHERE id = '${id}'`);
        return result;
    }),
    createCategorie: (name, description) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield Config_1.connection.query(`INSERT INTO categories (name, description) VALUES ('${name}', '${description}')`);
        return result;
    }),
    updateCategorie: (id, name, description) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield Config_1.connection.query(`UPDATE categories SET name = '${name}', description = '${description}' WHERE id = '${id}'`);
        return result;
    }),
    deleteCategorie: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield Config_1.connection.query(`DELETE FROM categories WHERE id = '${id}'`);
        return result;
    }),
};
exports.default = CategoriesModel;
