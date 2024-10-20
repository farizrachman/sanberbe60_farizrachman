# sanberbe60_farizrachman

# Final Project Sanbercode NodeJS Backend Develop, ecommerce dengan api dokumentasi swagger

**Deskripsi Singkat**

Ini adalah proyek Node.js yang menggunakan TypeScript dan Mongoose untuk membuat aplikasi E-commerce menggunakan api dokumentasi swagger.

**Teknologi yang Digunakan**

* Node.js
* ExpressJS
* TypeScript
* Mongodb
* Mongoose
* Cloudinary(File Upload Api)
* JWT(JsonWebToken)
* Swagger(Api Documentation)
* Vercel(Deployment)


**Cara Menjalankan Proyek**

1. **Instal dependensi:**
   ```bash
   npm install
   npm start

   http://localhost:3000/api-docs

   ## Penjelasan Lebih Lanjut

* **Struktur File:** Simpan file ini di direktori root proyek Anda.
* **Kustomisasi:** Sesuaikan bagian-bagian seperti deskripsi proyek, teknologi yang digunakan, dan perintah menjalankan aplikasi sesuai dengan proyek Anda.
* **URL Swagger:** Pastikan URL yang Anda berikan mengarah ke endpoint yang benar di aplikasi Anda. Anda perlu mengkonfigurasi middleware Swagger untuk membuat endpoint ini tersedia.
* **Keterangan Tambahan:** Tambahkan informasi tambahan yang relevan, seperti panduan penggunaan, contoh request dan response, atau informasi kontak.

## Integrasi Swagger dengan Proyek Anda

Untuk membuat URL Swagger di aplikasi Anda, Anda bisa menggunakan library seperti `swagger-jsdoc` atau `nestjs-swagger`. Berikut adalah contoh dasar menggunakan `swagger-jsdoc`:

```typescript
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info:  
 {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for  
 your project'
    }
  },
  apis: ['./routes/*.js'] // Path to your route files
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); 1 