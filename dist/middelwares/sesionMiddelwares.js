"use strict";
//esto es un middleware de Express que se encarga de verificar si el usuario que hace una solicitud es administrador
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
exports.isAdmin = void 0;
const jwtHandler_1 = require("../utils/jwtHandler"); //para verificar el token JWT
//import UserModel from "../models/UsersModel";
const Config_1 = require("../database/Config"); //para interactuar con la BD
//funcion que valida si es ADMIN o NO
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Verifica token
            //req.headers.authorization: accede al encabezado de autorización de la solicitud HTTP
            //El operador || se usa para dar un valor predeterminado en caso de que req.headers.authorization sea undefined o null
            const jwtByUser = req.headers.authorization || "";
            const jwt = jwtByUser
                .split(" ") //.split: divide la cadena jwtByUser en un array de subcadenas usando un espacio el espacio para separar
                .pop() || ""; //.pop: extrae y devuelve el último elemento del array resultante, es decir el token
            //Verifica token usando función verifyToken y lo almacena en jwtPayload
            const jwtPayload = yield (0, jwtHandler_1.verifyToken)(jwt);
            console.log("El TOKEN: " + jwtByUser);
            if (!jwtPayload) { //Si el token JWT no es válido
                res.status(401);
                res.send("Este Json Web Token no es válido ");
            }
            //verifica admin en BD
            //Obtiene el id del payload del token JWT 
            const payloadId = jwtPayload.id;
            //y luego realiza una consulta a la base de datos para obtener información del usuario asociado a ese id anterior
            const [results] = yield Config_1.connection.query(`SELECT * FROM users WHERE id = '${payloadId}'`);
            console.log("resultado: " + JSON.stringify(results));
            // Verificar si encontro el usuario en la base de datos con el nombre de usuario dado
            if (results.length === 0) {
                console.log("Usuario no econtrado");
            }
            const user = results[0]; //si lo encuentra guarda la info. de usuario en user
            console.log("Usuario encontrado: " + JSON.stringify(user));
            //Verifica el rol de administrador
            if (user.admin !== 1) { //si no es admin (diferente de 1)
                console.log("Usted no es administrador");
                res.status(401).json({ message: 'Los permisos no son válidos' });
                return;
            }
            next(); //Llama a next() para pasar la solicitud al siguiente middleware 
            return jwtPayload; //retorna el payload del token JW
        }
        catch (e) {
            res.status(400);
        }
    });
}
exports.isAdmin = isAdmin;
