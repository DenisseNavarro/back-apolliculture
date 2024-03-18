"use strict";
//se establece servidor Express que escucha en puerto 3000 y enruta solicitudes HTTP a diferentes routers para manejarlas
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importa y carga configuración de archivo .env usando paquete dotenv, que permite leer variables de entorno desde este fichero
require("dotenv/config");
//Importa routers para las entidades, los routers manejan las solicitudes HTTP relacionadas con estas entidades
const express_1 = __importDefault(require("express"));
const UsersRouter_1 = __importDefault(require("./routes/UsersRouter"));
const ProductsRouter_1 = __importDefault(require("./routes/ProductsRouter"));
const CategoriesRouter_1 = __importDefault(require("./routes/CategoriesRouter"));
const OrdersRouter_1 = __importDefault(require("./routes/OrdersRouter"));
const OrdersDetailsRouter_1 = __importDefault(require("./routes/OrdersDetailsRouter"));
//importa archivo de configuración de Cloudinary y el multer
const CloudinaryRouter_1 = __importDefault(require("./routes/CloudinaryRouter"));
const multer_1 = __importDefault(require("multer"));
//Crea instancia de aplicación Express y la asigna a variable app
const app = (0, express_1.default)();
const port = 3000; //puerto en el que el servidor escucha las solicitudes HTTP
//Crea variable upload para manejar la subida de archivos
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use(express_1.default.json());
//Monta el router UsersRouter en la ruta base /users/.
//es decir que todas las solicitudes que comiencen con /users/ serán manejadas por UsersRouter
app.use("/users", UsersRouter_1.default);
app.use("/products/", ProductsRouter_1.default);
app.use("/categories/", CategoriesRouter_1.default);
app.use("/orders/", OrdersRouter_1.default);
app.use("/ordersdetails/", OrdersDetailsRouter_1.default);
//Monta el router CloudinaryRouter en la ruta base /cloudinary/
app.use('/cloudinary', upload.single('image'), CloudinaryRouter_1.default);
//se inicia el servidor Express y hace que escuche en el puerto especificado (port)
//ya funcioando el servidor imprime por consola URL en la que esta el servidor
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
