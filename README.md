# 


Prisma

1. ejecutar esto
npm install prisma --save-dev
2. Iniciarlizar prima con este comando. Crea carpeta y .env
npx prisma init

3. cambiar provider por mysql.
cambiar variable DATABASE_URL en archivo .env con el formato de mysql
4. traer la estructura de la BD con este comando
npx prisma db pull

5. Installar el cliente para interactuar con la BD
npm install @prisma/client

Genera la BD
OJO-> borra los datos
npx prisma migrate dev --name init

NOTA: url con las funciones CRUD
https://www.prisma.io/docs/orm/prisma-schema/data-model/models#queries-crud