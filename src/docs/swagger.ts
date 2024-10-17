import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API BukaToko",
        description: "Dokumentasi API BukaToko",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            LoginRequest: {
                email: "joni2024@yopmail.com",
                password: "123412341",
            },
            RegisterRequest: {
                fullName: "joni joni",
                username: "joni2024",
                email: "joni2024@yopmail.com",
                password: "123412341",
                confirmPassword: "123412341",
            },
            UpdateProfileRequest: {
                fullName: "joni joni",
                username: "joni2024",
                email: "joni2024@yopmail.com",
                password: "123412341",
                confirmPassword: "123412341",
            },
            ProductCreateRequest: {
                name: "Laptop Lenovo Legion 5",
                description: "Deskripsi Laptop Lenovo Legion 5",
                images: "http://res.cloudinary.com/druuy0ht8/image/upload/v1728401802/wosv716cuq2inyf0eg0n.jpg",
                price: 10000000,
                qty: 15,
                categoryId: "67034fcf047141cf27b8e97d",
            },
        },
    },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);