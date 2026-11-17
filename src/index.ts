import express from "express";
import type { Application, Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import clienteRoutes from "./routes/clienteRoutes"

dotenv.config();

const app: Application = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.json({
    mensaje: "API funcionando.",
  });
});

app.use("/clientes", clienteRoutes);

app.listen(PORT, function () {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO http://localhost:${PORT}`);
});