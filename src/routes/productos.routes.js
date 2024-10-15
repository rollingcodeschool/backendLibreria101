import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  funcionPrueba,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers.js";
import validacionProducto from "../helpers/validacionProducto.js";
import validarJWT from "../helpers/verificarJWT.js";


const router = Router();
router.route("/prueba").get(funcionPrueba);
router.route("/productos").post([validarJWT,validacionProducto],crearProducto).get(listarProductos);
router
  .route("/productos/:id")
  .put(editarProducto)
  .delete([validarJWT],borrarProducto)
  .get(obtenerProducto);

export default router;
