import express from "express";
import type { Application, Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import platoRouter from './platos/plato.routes'; // === RUTAS MIGUEL (PLATOS) ===
import ingredienteRouter from './ingredientes/ingrediente.routes'; // === RUTAS MIGUEL (INGREDIENTES) ===
import platoIngredienteRouter from './platoIngredientes/platoIngrediente.routes'; // === RUTAS MIGUEL (PLATO-INGREDIENTES) ===

dotenv.config();

const app: Application = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ===== ENDPOINTS MIGUEL =====
app.use('/platos', platoRouter);
app.use('/ingredientes', ingredienteRouter);
app.use('/plato-ingredientes', platoIngredienteRouter);

app.get("/", function (req: Request, res: Response) {
  res.json({
    mensaje: "API funcionando.",
  });
});

// app.use("/", userRouter);

app.listen(PORT, function () {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO http://localhost:${PORT}`);
});