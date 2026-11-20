import express from "express";
import type { Application, Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
import proveedorRoutes from "./routes/proveedor.routes";
import proveedorIngredienteRoutes from "./routes/proveedorIngrediente.routes";
import pedidoRoutes from "./routes/pedido.routes";
import detallePedidoRoutes from "./routes/detallePedido.routes";
import clienteRoutes from "./routes/clienteRoutes";
import empleadoRoutes from "./routes/empleadoRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", function (req: Request, res: Response) {
  /* 
    #swagger.tags = ['Test']
    #swagger.summary = 'Verificar que la API este funcionando.' 
  */
  res.json({
    mensaje: "API funcionando.",
  });
});

app.use("/clientes", clienteRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/proveedor-ingredientes", proveedorIngredienteRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/detalle-pedidos", detallePedidoRoutes);

app.listen(PORT, function () {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO http://localhost:${PORT}`);
});
