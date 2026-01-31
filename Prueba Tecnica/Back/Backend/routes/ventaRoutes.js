import express from "express";
import * as c from "../controllers/ventaController.js";

const router = express.Router();

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Obtener todas las ventas con producto y vendedor
 */
router.get("/", c.getAll);

/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: Registrar una nueva venta
 */
router.post("/", c.create);

/**
 * @swagger
 * /ventas/{id}:
 *   delete:
 *     summary: Eliminar una venta
 */
router.delete("/:id", c.remove);





export default router;
