import express from "express";
import type { Application, Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
import platoRouter from "./routes/plato.routes";
import platoIngredienteRouter from "./routes/platoIngrediente.routes";
import ingredienteRoutes from "./routes/ingrediente.routes";
import proveedorRoutes from "./routes/proveedor.routes";
import proveedorIngredienteRoutes from "./routes/proveedorIngrediente.routes";
import pedidoRoutes from "./routes/pedido.routes";
import detallePedidoRoutes from "./routes/detallePedido.routes";
import clienteRoutes from "./routes/clienteRoutes";
import empleadoRoutes from "./routes/empleadoRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import authRoutes from "./routes/auth.routes";
import { verificarToken, autorizarRoles } from "./middlewares/auth.middleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.json({
    mensaje: "API funcionando.",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/api/platos", platoRouter);
app.use("/api/plato-ingredientes", platoIngredienteRouter);
app.use("/api/ingredientes", ingredienteRoutes);

// Mesero y Gerente: pedidos y detalles
app.use("/api/pedidos", verificarToken, autorizarRoles("MESERO", "GERENTE"), pedidoRoutes);
app.use("/api/detalle-pedidos", verificarToken, autorizarRoles("MESERO", "GERENTE"), detallePedidoRoutes);

// Solo Gerente: proveedores y proveedor-ingredientes
app.use("/api/proveedores", verificarToken, autorizarRoles("GERENTE"), proveedorRoutes);
app.use("/api/proveedor-ingredientes", verificarToken, autorizarRoles("GERENTE"), proveedorIngredienteRoutes);

app.listen(PORT, function () {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO http://localhost:${PORT}`);
});
//si corre