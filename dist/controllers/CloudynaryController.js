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
exports.uploadImageController = void 0;
const CloudinaryModel_1 = require("../models/CloudinaryModel");
const fs_1 = __importDefault(require("fs"));
function uploadImageController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
            }
            // Obtener la extensión del archivo original
            const originalNameParts = req.file.originalname.split('.');
            const extension = originalNameParts[originalNameParts.length - 1];
            // Generar un nombre de archivo único y legible
            const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 10000)}.${extension}`;
            // Guardar la imagen en la carpeta "uploads" con el nuevo nombre
            const newPath = `uploads/${uniqueFileName}`;
            fs_1.default.renameSync(req.file.path, newPath);
            // Luego, subir la imagen a Cloudinary
            const imageUrl = yield (0, CloudinaryModel_1.uploadImage)(newPath);
            res.json({ imageUrl });
        }
        catch (error) {
            console.error('Error en el controlador de subida de imágenes:', error);
            res.status(500).json({ error: 'Error en el controlador de subida de imágenes' });
        }
    });
}
exports.uploadImageController = uploadImageController;
