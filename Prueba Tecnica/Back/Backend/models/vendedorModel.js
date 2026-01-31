import pool from "../db/db.js";

export const getAll = async () => {
  const res = await pool.query("SELECT * FROM vendedores ORDER BY id");
  return res.rows;
};

export const getById = async (id) => {
  const res = await pool.query("SELECT * FROM vendedores WHERE id=$1", [id]);
  return res.rows[0];
};

export const create = async ({ nombre, correo }) => {
  const res = await pool.query(
    "INSERT INTO vendedores (nombre, correo) VALUES ($1,$2) RETURNING *",
    [nombre, correo]
  );
  return res.rows[0];
};

export const update = async (id, { nombre, correo }) => {
  const res = await pool.query(
    "UPDATE vendedores SET nombre=$1, correo=$2 WHERE id=$3 RETURNING *",
    [nombre, correo, id]
  );
  return res.rows[0];
};

export const remove = async (id) => {
  await pool.query("DELETE FROM vendedores WHERE id=$1", [id]);
};



export const toggleActivo = async (id) => {
  await pool.query(
    "UPDATE vendedores SET activo = NOT activo WHERE id = $1",
    [id]
  );
};

export const existsCorreo = async (correo, id = null) => {
 
  const query = id 
    ? "SELECT * FROM vendedores WHERE correo=$1 AND id <> $2"
    : "SELECT * FROM vendedores WHERE correo=$1";

  const values = id ? [correo, id] : [correo];
  const res = await pool.query(query, values);
  return res.rows.length > 0;
};
