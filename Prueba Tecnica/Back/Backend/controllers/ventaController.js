import * as Venta from "../models/ventaModel.js";

/* 🔹 GET /ventas */
export const getAll = async (req, res) => {
  try {
    const ventas = await Venta.getAll();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* 🔹 POST /ventas */
export const create = async (req, res) => {
  try {
    const venta = await Venta.create(req.body);
    res.json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* 🔹 DELETE /ventas/:id */
export const remove = async (req, res) => {
  try {
    await Venta.remove(req.params.id);
    res.json({ msg: "Eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
