"use strict";
//Se usa biblioteca jsonwebtoken. para manejar la generación y verificación de tokens JWT (JSON Web Tokens) 
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
exports.verifyToken = exports.generateToken = void 0;
//Importa funciones sign y verify de la biblioteca jsonwebtoken
//que se utilizan para firmar y verificar tokens JWT
const jsonwebtoken_1 = require("jsonwebtoken");
//JWT_SECRET: representa clave secreta usada para firmar y verificar los tokens
//JWT_SECRET se obtiene de una variable de entorno en el archivo .env
const JWT_SECRET = process.env.JWT_SECRET || '';
//Fucion que GENERA el token
function generateToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        //función que firma un token JWT usando el id y la clave secreta JWT_SECRET
        const jwt = (0, jsonwebtoken_1.sign)({ id }, JWT_SECRET, {
            expiresIn: "1h", //token expirará en 1 hora
        });
        return jwt; //retorna token firmado
    });
}
exports.generateToken = generateToken;
//Funcion que VERIFICA el token
function verifyToken(jwt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //la funcion verify: verifica validez del token y la clave secreta JWT_SECRET
            const isValid = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
            return isValid; //retorna boleano (true)
        }
        catch (error) {
            console.error("Error de la verificación JWT: ", error);
            return false;
        }
    });
}
exports.verifyToken = verifyToken;
