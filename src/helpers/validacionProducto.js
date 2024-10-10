import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
  check("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es un dato obligatorio")
    .isLength({
      min: 2,
      max: 100,
    })
    .withMessage(
      "El nombre del producto debe tener entre 2 y 100 caracteres inclusive"
    ),
  check("imagen")
    .notEmpty()
    .withMessage("La url de la imagen es un dato obligatorio")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
    .withMessage(
      "La imagen debe ser una url valida y debe terminar con uno de los siguientes formatos (jpg|jpeg|gif|png)"
    ),
  check("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn(["Arte", "Cuadernos", "Escritura", "Hojas"])
    .withMessage(
      'La categoria debe ser una de las siguientes opciones ["Arte", "Cuadernos", "Escritura", "Hojas"]'
    ),
  //luego de hacer todas las validaciones, invoco a resultado validacion
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
