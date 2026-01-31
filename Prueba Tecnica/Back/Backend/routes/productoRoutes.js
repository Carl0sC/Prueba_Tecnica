import express from "express";
import * as c from "../controllers/productoController.js";

const router = express.Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", c.getAll);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Producto encontrado
 */
router.get("/:id", c.getOne);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Producto creado
 */
router.post("/", c.create);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 */
router.put("/:id", c.update);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 */
router.delete("/:id", c.remove);

export default router;
