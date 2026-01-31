import * as Vendedor from "../models/vendedorModel.js";


export const getAll = async (req, res) => {
  try {
    const data = await Vendedor.getAll();
    res.json(data);
  } catch (error) {
    console.error("Error getAll:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await Vendedor.getById(req.params.id);
    res.json(data);
  } catch (error) {
    console.error("Error getOne:", error);
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await Vendedor.create(req.body);
    res.json(data);
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await Vendedor.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    console.error("Error update:", error);
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Vendedor.remove(req.params.id);
    res.json({ msg: "Vendedor eliminado" });
  } catch (error) {
    console.error("Error remove:", error);
    res.status(500).json({ error: error.message });
  }
};

export const toggle = async (req, res) => {
  try {
    await Vendedor.toggleActivo(req.params.id);
    res.json({ message: "Estado actualizado" });
  } catch (error) {
    console.error("Error toggle:", error);
    res.status(500).json({ error: error.message });
  }
};

// Verificar si puede eliminar (sin ventas)
export const puedeEliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS total FROM ventas WHERE vendedor_id=$1",
      [id]
    );
    const tieneVentas = result.rows[0].total > 0;
    res.json({ puedeEliminar: !tieneVentas });
  } catch (error) {
    console.error("Error en puedeEliminar:", error);
    res.status(500).json({ error: error.message });
  }
};

// Validar correo único
export const checkCorreo = async (req, res) => {
  try {
    const { correo } = req.params;
    const id = req.query.id ? Number(req.query.id) : null;
    const existe = await Vendedor.existsCorreo(correo, id);
    res.json(existe);
  } catch (error) {
    console.error("Error checkCorreo:", error);
    res.status(500).json({ error: error.message });
  }
};
