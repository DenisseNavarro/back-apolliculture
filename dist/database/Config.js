"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const promise_1 = require("mysql2/promise");
// Objeto CONFIG: contiene la configuración necesaria para establecer la conexión a la base de datos
const CONFIG = {
    host: 'viaduct.proxy.rlwy.net',
    user: 'root',
    password: 'rjRNWEIJuntlwIoMszhmYYqDkBYAyTsv',
    database: 'railway',
    port: 56278
};
exports.connection = (0, promise_1.createPool)(CONFIG);
