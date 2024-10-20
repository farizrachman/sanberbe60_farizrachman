# sanberbe60_farizrachman

# E-Commerce dengan api dokumentasi Swagger

**Deskripsi Singkat**

Ini adalah proyek Node.js yang menggunakan TypeScript dan Mongoose untuk membuat aplikasi E-commerce menggunakan api dokumentasi swagger.

**Teknologi yang Digunakan**

- Node.js
- ExpressJS
- TypeScript
- Mongodb
- Mongoose
- Cloudinary(File Upload Api)
- JWT(JsonWebToken)
- Swagger(Api Documentation)
- Vercel(Deployment)

**Cara Menjalankan Proyek**

1. **Instal dependensi:**

   ```bash / terminal di vscode
   npm install express
   npm install --save-dev typescript
   npm install body-parser
   npm install cors
   npm install multer
   npm i --save-dev @types/multer
   <!-- api file upload -->
   npm i cloudinary

    <!-- database -->
   npm install mongodb
   npm install save mongoose

   npm i yup @types/yup

   <!-- untuk jwt/secure -->
   npm i dotenv @types/dotenv

   <!-- membuat token jwt -->
   npx ts-node ./src/utils/secret.ts

   npm i jsonwebtoken
   npm i --save-dev @types/jsonwebtoken

   <!-- api dokumentasi -->
   npm install swagger-autogen swagger-ui-express @types/swagger-ui-express
   npm run docs

   npm install nodemailer @types/nodemailer
   npm i ejs @types/ejs
   ```

Demo aplikasi :
https://sanberbe60-farizrachman.vercel.app/docs
