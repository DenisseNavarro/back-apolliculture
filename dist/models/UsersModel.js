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
//Importa la conexión a BD desde el archivo de configuración Config
const Config_1 = require("../database/Config");
//import connectionPrisma from "../database/PrismaConnection";
const UsersModel = {
    // ejecuta consulta SQL que obtiene TODOS los usuarios de la tabla users, retorna result
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        //const result = connectionPrisma.users.findMany();
        const [result] = yield Config_1.connection.query('SELECT * FROM users');
        return result;
    }),
    //getUser tiene parámetro id y ejecuta consulta SQL para obtener un usuario por  ID
    getUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        /*const result = connectionPrisma.users.findUnique({
            where: {
              id: id,
            },
          });*/
        const [result] = yield Config_1.connection.query(`SELECT * FROM users WHERE id = '${id}'`);
        return result;
    }),
    //toma un parámetro (username) y ejecuta consulta SQL para obtener un usuario por su username
    getUserByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        /*const result = connectionPrisma.users.findUnique({
            where: {
                username: username,
            },
          });*/
        const [result] = yield Config_1.connection.query(`SELECT * FROM users WHERE username = '${username}'`);
        return result;
    }),
    //CREA un nuevo usuario en BD con los datos proporcionados y devuelve el resultado de la operación de inserción
    createUser: (first_name, last_name, username, password, email, admin) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield Config_1.connection.query(`INSERT INTO users (first_name, last_name, username, password, email, admin) VALUES ('${first_name}', '${last_name}', '${username}', '${password}', '${email}', ${admin})`);
        /*createUser: async (body: any) => {
            const result = connectionPrisma.users.create({
                    data: body,
                });*/
        return result;
    }),
    //ACTUALIZA los datos de usuario existente, con los nuevos datos y devuelve el resultado de la operación
    updateUser: (id, first_name, last_name, username, password, email, admin) => __awaiter(void 0, void 0, void 0, function* () {
        // SE DEBE: Agregar select * from users where id= id; para verificar que usuario existe antes de actualizar
        const [result] = yield Config_1.connection.query(`UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', username = '${username}', password = '${password}', email = '${email}', admin = ${admin} WHERE id = '${id}'`);
        /*updateUsers: async (id: string, body: any) => {
            const result = connectionPrisma.users.update({
                where: { id: id },
                data: body,
            });*/
        return result;
    }),
    //ELIMINA usuario de la BD por ID y devuelve resultado de la operación de eliminación
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        // SE DEBE: Agregar select * from users where id= id; para verificar que usuario existe antes de eliminar
        const [result] = yield Config_1.connection.query(`DELETE FROM users WHERE id = '${id}'`);
        /*const result = connectionPrisma.users.delete({
            where: { id: id },
          })*/
        return result;
    }),
};
exports.default = UsersModel;
