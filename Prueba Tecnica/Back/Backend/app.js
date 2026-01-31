import express from "express";
import cors from "cors";
import pool from "./db/db.js";

import productoRoutes from "./routes/productoRoutes.js";
import vendedorRoutes from "./routes/vendedorRoutes.js";
import ventaRoutes from "./routes/ventaRoutes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/productos", productoRoutes);
app.use("/vendedores", vendedorRoutes);
app.use("/ventas", ventaRoutes);

app.get("/", (req,res)=>{
  res.send("API funcionando");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("API corriendo en puerto 3000");
});


pool.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.error("Error DB:", err));

