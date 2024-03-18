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
const UsersModel_1 = __importDefault(require("../models/UsersModel"));
const passwordHandler_1 = require("../utils/passwordHandler");
const jwtHandler_1 = require("../utils/jwtHandler");
const UsersController = {
    // Función para OBTENER TODOS los datos de usuarios:
    // Devuelve una respuesta Json
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield UsersModel_1.default.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the user' });
        }
    }),
    // Función para OBTENER usuario por ID
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            // Llama método del modelo para obtener un usuario por ID
            const users = yield UsersModel_1.default.getUser(userId);
            if (!Array.isArray(users) || users.length === 0) {
                res.status(404).json({ message: `The user with id ${userId}, has not found` });
                return;
            }
            res.status(200).json(users); // Devuelve el usuario encontrado
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error reading the user' });
        }
    }),
    // Función para agregar un nuevo usuario
    addUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Obtiene los datos del cuerpo de la solicitud
            const { first_name, last_name, username, password, email, admin } = req.body;
            // Verifica si hay datos faltantes
            if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
                res.status(400).json({ message: 'Please enter the user information' });
                return;
            }
            // Encripta la contraseña antes de guardarla en la BD
            const password_encrypted = yield (0, passwordHandler_1.encrypt)(password);
            yield UsersModel_1.default.createUser(first_name, last_name, username, password_encrypted, email, admin);
            res.status(201).json({ message: 'User created correctly!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error creating this user' });
        }
    }),
    // Función para ACTUALIZAR un usuario
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            // Obtiene los datos del cuerpo de la solicitud
            const { first_name, last_name, username, password, email, admin } = req.body;
            // Verifica si hay datos faltantes
            if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
                res.status(400).json({ message: 'Please enter all user information' });
                return;
            }
            // Encripta la contraseña antes de actualizarla en la base de datos
            const password_encrypted = yield (0, passwordHandler_1.encrypt)(password);
            // Actualiza el usuario utilizando el modelo de usuario
            yield UsersModel_1.default.updateUser(id, first_name, last_name, username, password_encrypted, email, admin);
            res.status(200).json({ message: 'User up to date!' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error while Updating the user' });
        }
    }),
    // Función para ELIMINAR usuario
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            // Elimina el usuario utilizando el modelo de usuario
            yield UsersModel_1.default.deleteUser(id);
            res.status(200).json({ message: 'User successfully deleted' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error deleting the user' });
        }
    }),
    // ********** Inicio de sesión ************
    // Función de solicitud de inicio de sesión
    // Recibe 2 parametros: req (solicitud HTTP entrante) y res (respuesta HTTP que se enviara)
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Obtiene nombre de usuario y contraseña del cuerpo de la solicitud HTTP
            const { username, password } = req.body;
            // Busca el usuario en la BD por username, llama función getUserByUsername del modelo UsersModel   
            const user = yield UsersModel_1.default.getUserByUsername(username);
            // Verificar si NO encontró el usuario en BD con el nombre de usuario proporcionado
            if (user.length === 0) {
                res.status(404).json({ message: 'User Not Found' });
                return;
            }
            // Obtiene el primer usuario encontrado, posición cero
            const userFound = user[0];
            console.log("User Found: " + JSON.stringify(userFound));
            // Verificar que la contraseña es correcta
            // Llama función verify. verifica si la contraseña coincide con la almacenada en BD
            const isValid = yield (0, passwordHandler_1.verify)(String(password), String(userFound.password));
            if (isValid) { // Si es válida
                // Genera un token JWT (JSON Web Token) usando el ID de usuario
                const token = yield (0, jwtHandler_1.generateToken)(String(userFound.id));
                // Se extrae nombre de usuario y el ID encontrado para incluirlos en la respuesta
                const userName = userFound.username;
                const userId = userFound.id;
                const data = {
                    token,
                    userId,
                    userName
                };
                // Si la autenticación es exitosa, envía respuesta con (token, ID y nombre de usuario) en formato JSON
                res.status(200).json({
                    message: 'User Logged in',
                    data: data
                });
                return;
            }
            res.status(401).json({ message: 'Logged in error' });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error when logged in' });
        }
    }),
};
exports.default = UsersController;
