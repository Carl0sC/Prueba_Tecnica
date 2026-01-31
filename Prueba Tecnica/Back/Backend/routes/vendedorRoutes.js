import express from "express";
import * as c from "../controllers/vendedorController.js";

const router = express.Router();

/**
 * @swagger
 * /vendedores:
 *   get:
 *     summary: Obtener todos los vendedores
 */
router.get("/", c.getAll);

/**
 * @swagger
 * /vendedores/{id}:
 *   get:
 *     summary: Obtener vendedor por ID
 */
router.get("/:id", c.getOne);

/**
 * @swagger
 * /vendedores:
 *   post:
 *     summary: Crear vendedor
 */
router.post("/", c.create);

/**
 * @swagger
 * /vendedores/{id}:
 *   put:
 *     summary: Actualizar vendedor
 */
router.put("/:id", c.update);

/**
 * @swagger
 * /vendedores/{id}:
 *   delete:
 *     summary: Eliminar vendedor
 */
router.delete("/:id", c.remove);

/**
 * @swagger
 * /vendedores/{id}/desactivar:
 *   put:
 *     summary: Desactiva un vendedor (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vendedor a desactivar
 *     responses:
 *       200:
 *         description: Vendedor desactivado
 */
router.patch("/:id/desactivar", c.toggle);

/**
 * @swagger
 * /
 * Valida si el correo ya existe en la bd
 */
router.get("/check-correo/:correo", c.checkCorreo);
// Obtener vendedor por ID
router.get("/:id", c.getOne);

router.get("/:id/puede-eliminar", c.puedeEliminar);


export default router;
