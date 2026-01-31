import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "ventasdb",
  port: 5432
});

export default pool;
