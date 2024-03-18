//se establece servidor Express que escucha en puerto 3000 y enruta solicitudes HTTP a diferentes routers para manejarlas

//Importa y carga configuración de archivo .env usando paquete dotenv, que permite leer variables de entorno desde este fichero
import 'dotenv/config';
//Importa routers para las entidades, los routers manejan las solicitudes HTTP relacionadas con estas entidades
import express from 'express';
import UsersRouter from './routes/UsersRouter';
import ProductsRouter from './routes/ProductsRouter';
import CategoriesRouter from './routes/CategoriesRouter';
import OrdersRouter from './routes/OrdersRouter';
import OrdersDetailsRouter from './routes/OrdersDetailsRouter'

//importa archivo de configuración de Cloudinary y el multer
import CloudinaryRouter from './routes/CloudinaryRouter';
import multer from 'multer';

//Crea instancia de aplicación Express y la asigna a variable app
const app = express();
const port = 3000;//puerto en el que el servidor escucha las solicitudes HTTP
//Crea variable upload para manejar la subida de archivos
const upload = multer({ dest: 'uploads/' });

app.use(express.json()) 

//Monta el router UsersRouter en la ruta base /users/.
//es decir que todas las solicitudes que comiencen con /users/ serán manejadas por UsersRouter
app.use("/users", UsersRouter);

app.use("/products/", ProductsRouter);

app.use("/categories/", CategoriesRouter);

app.use("/orders/", OrdersRouter);

app.use("/ordersdetails/", OrdersDetailsRouter);
//Monta el router CloudinaryRouter en la ruta base /cloudinary/
app.use('/cloudinary', upload.single('image'), CloudinaryRouter);

//se inicia el servidor Express y hace que escuche en el puerto especificado (port)
//ya funcioando el servidor imprime por consola URL en la que esta el servidor
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});




