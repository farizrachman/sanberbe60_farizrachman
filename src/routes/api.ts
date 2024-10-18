import express from "express";

import uploadMiddleware from "../middlewares/upload.middleware";
import uploadController from "../controllers/upload.controller";
import productsController from "../controllers/products.controller";
import categoriesController from "../controllers/categories.controller";
import ordersController from "../controllers/orders.controller";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import rbacMiddleware from "../middlewares/rbac.middleware";

const router = express.Router();

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);
// /categories/:id -> parameter
// /categories?page=1&limit=10&search=kemeja -> query url

// Auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
// router.post("/auth/me", authMiddleware, authController.me);
router.post(
    "/auth/me",
    [authMiddleware, rbacMiddleware(["admin"])],
    authController.me
);
// router.put("/auth/update-profile", authMiddleware, authController.updateProfile);
router.put("/auth/update-profile", authMiddleware, authController.profile);

// CRUD Orders
router.get("/orders", ordersController.findAll);
router.post("/orders", ordersController.create);
router.get("/orders/:id", ordersController.findOne);
router.put("/orders/:id", ordersController.update);
router.delete("/orders/:id", ordersController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

export default router;
