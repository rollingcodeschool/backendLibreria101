import jwt from "jsonwebtoken";

const validarJWT = (req, res, next) => {
  //recibir el token
  console.log(req.header);
  const token = req.header("x-token");
  if (!token) {
    //401 error en la autenticacion
    return res.status(401).json({
      mensaje: "No hay token en la peticion",
    });
  }
  // si el token existe
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    // estas lineas las puedo omitir sino necesito los datos que vienen en el payload del token
    req._id = payload.uid;
    req.email = payload.email;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    //error 401 es no autorizado
    switch (error.name) {
      case "JsonWebTokenError":
        return res.status(401).json({ mensaje: "Token invalido" });
      case "TokenExpiredError":
        return res.status(401).json({ mensaje: "el token expiro" });
      case "UnauthorizedError":
        return res
          .status(403)
          .json({
            mensaje:
              "No tiene los permisos suficientes para acceder al recurso",
          });
      default:
        return res.status(500).json({ mensaje: "Error al verificar el token" });
    }
  }
};

export default validarJWT;

// Usar switch para manejo de errores
//  switch (error.name) {
//   case "JsonWebTokenError":
//     return res.status(401).json({ mensaje: "Token inválido" });
//   case "TokenExpiredError":
//     return res.status(401).json({ mensaje: "Token expirado" });
//   case "NotBeforeError":
//     return res.status(401).json({ mensaje: `Token no válido antes de ${error.date}` });
//   case "UnauthorizedError":
//     return res.status(403).json({ mensaje: "No tienes permisos para acceder a este recurso" });
//   default:
//     return res.status(500).json({ mensaje: "Error en la autenticación" });
// }
