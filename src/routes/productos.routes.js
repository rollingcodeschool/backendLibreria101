import { Router } from "express";
import { crearProducto, funcionPrueba } from "../controllers/productos.controllers.js";

const router = Router();
router.route('/prueba').get(funcionPrueba);
router.route('/productos').post(crearProducto)

export default router