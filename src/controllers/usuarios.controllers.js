import Usuario from "../database/model/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
  try {
    //agregar validaciones
    //verificar si el mail ya fue registrado
    const { email, password, nombreUsuario } = req.body;
    // findOne({email}) equivale findOne({email: req.body.email})
    const usuarioExistente = await Usuario.findOne({ email });
    //valores falsos = if(false) / if(null)
    //pregunto si el usuario ya existe
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Este correo ya se encuentra registrado" });
    }
    //crear el usuario
    const nuevoUsuario = new Usuario(req.body);
    //hashear el password
    const saltos = bcrypt.genSaltSync(10);
    nuevoUsuario.password = bcrypt.hashSync(password, saltos);
    nuevoUsuario.save();
    //enviar respuesta afirmativa
    res.status(201).json({ mensaje: "El usuario se creo correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ mensaje: "Ocurrio un error al intentar crear un usuario" });
  }
};
export const login = async (req, res) => {
  try {
    //agregar validaciones
    //verificar si el mail ya fue registrado
    const { email, password } = req.body;
    // findOne({email}) equivale findOne({email: req.body.email})
    const usuarioExistente = await Usuario.findOne({ email });
    //si no existe el email en algun usuario
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - email" });
    }
    //verificar el password
    const passwordValido = bcrypt.compareSync(password, usuarioExistente.password)
    //quiero saber si el password en incorrecto
    if (!passwordValido) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - password" });
    }
    // generar un token
    const token = await generarJWT(usuarioExistente._id, usuarioExistente.email)
    // respodemos afirmativamente
    res.status(200).json({
      mensaje: "Los datos del usuario son validos",
      email,
      token
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar loguear a un usuario" });
  }
};
