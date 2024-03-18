"use strict";
// rutas para las operaciones CRUD
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
// Creo un nuevo enrutador usando el método Router() de Express y lo asigna a la variable UsersRouter
const UsersRouter = (0, express_1.Router)();
// Se definen las rutas relacionadas con los usuarios y se asocian con las funciones del controlador correspondiente
//Define ruta para GET a la raíz / y asocia la función getAllUsers del controlador UsersController para la solicitud
UsersRouter.route("/").get(UserController_1.default.getAllUsers);
//Define ruta para GET con parámetro id y asocia la función getUser del controlador UsersController para la solicitud
UsersRouter.route("/:id").get(UserController_1.default.getUser);
UsersRouter.route("/").post(UserController_1.default.addUser);
UsersRouter.route("/:id").put(UserController_1.default.updateUser);
UsersRouter.route("/:id").delete(UserController_1.default.deleteUser);
//Define ruta para POST a /login y asocia la función login del controlador UsersController para la solicitud
UsersRouter.route("/login").post(UserController_1.default.login);
exports.default = UsersRouter;
