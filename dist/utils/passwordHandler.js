"use strict";
//se usa bcrypt para encriptar contraseñas 
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
exports.verify = exports.encrypt = void 0;
//Importa funciones hash y compare de la biblioteca bcrypt
//hash: para generar un hash de una contraseña, y compare: para verificar si una contraseña coincide con un hash dado
const bcrypt_1 = require("bcrypt");
//funcion de ENCRIPTADO
function encrypt(password) {
    return __awaiter(this, void 0, void 0, function* () {
        //la función hash de bcrypt: genera un hash de la contraseña dada
        const passwordHash = yield (0, bcrypt_1.hash)(password, 8);
        return passwordHash; //retorna hash de la contraseña
    });
}
exports.encrypt = encrypt;
//Funcion de VERIFICADO
function verify(password, passwordHash) {
    return __awaiter(this, void 0, void 0, function* () {
        //función compare de bcrypt: compara la contraseña dada (password) con el hash de contraseña (passwordHash)
        const isValid = yield (0, bcrypt_1.compare)(password, passwordHash);
        return isValid; //retorna boleano
    });
}
exports.verify = verify;
