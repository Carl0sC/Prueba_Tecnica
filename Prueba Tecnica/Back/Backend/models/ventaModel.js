import pool from "../db/db.js";

// Obtener todas las ventas
export const getAll = async () => {
  const res = await pool.query(`
    SELECT 
      v.id,
      v.cantidad,
      v.total,
      p.nombre AS producto,
      ve.nombre AS vendedor
    FROM ventas v
    JOIN productos p ON p.id = v.producto_id
    JOIN vendedores ve ON ve.id = v.vendedor_id
    ORDER BY v.id DESC
  `);
  return res.rows;
};

// Crear nueva venta
export const create = async ({ producto_id, vendedor_id, cantidad }) => {
  // Validar producto
  const prodRes = await pool.query(
    "SELECT precio, stock, activo FROM productos WHERE id=$1",
    [producto_id]
  );

  if (prodRes.rows.length === 0) throw new Error("Producto no existe");
  if (!prodRes.rows[0].activo) throw new Error("Producto inactivo");
  if (prodRes.rows[0].stock < cantidad) throw new Error("Stock insuficiente");

  // Validar vendedor
  const vendRes = await pool.query(
    "SELECT activo FROM vendedores WHERE id=$1",
    [vendedor_id]
  );

  if (vendRes.rows.length === 0) throw new Error("Vendedor no existe");
  if (!vendRes.rows[0].activo) throw new Error("Vendedor inactivo");

  const total = prodRes.rows[0].precio * cantidad;

  // Registrar venta
  const res = await pool.query(
    "INSERT INTO ventas (producto_id, vendedor_id, cantidad, total) VALUES ($1,$2,$3,$4) RETURNING *",
    [producto_id, vendedor_id, cantidad, total]
  );

  // Restar stock
  await pool.query(
    "UPDATE productos SET stock = stock - $1 WHERE id = $2",
    [cantidad, producto_id]
  );

  return res.rows[0];
};

// Eliminar venta
export const remove = async (id) => {
  // Eliminar venta
  const res = await pool.query(
    "DELETE FROM ventas WHERE id=$1 RETURNING *",
    [id]
  );

  if (res.rows.length === 0) throw new Error("Venta no encontrada");
  return res.rows[0];
};
