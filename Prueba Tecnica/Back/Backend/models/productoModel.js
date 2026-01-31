
import pool from "../db/db.js";
export const getAll = async () => {
  const res = await pool.query("SELECT * FROM productos ORDER BY id");
  return res.rows;
};

export const getById = async (id) => {
  const res = await pool.query("SELECT * FROM productos WHERE id=$1", [id]);
  return res.rows[0];
};

export const create = async ({ nombre, precio, stock }) => {
  const res = await pool.query(
    "INSERT INTO productos (nombre, precio, stock) VALUES ($1,$2,$3) RETURNING *",
    [nombre, precio, stock]
  );
  return res.rows[0];
};

export const update = async (id, { nombre, precio, stock }) => {
  const res = await pool.query(
    "UPDATE productos SET nombre=$1, precio=$2, stock=$3 WHERE id=$4 RETURNING *",
    [nombre, precio, stock, id]
  );
  return res.rows[0];
};

export const remove = async (id) => {
  await pool.query("DELETE FROM productos WHERE id=$1", [id]);
};
