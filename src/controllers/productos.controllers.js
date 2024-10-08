import Producto from "../database/model/producto.js";

Producto;
export const funcionPrueba = (req, res) => {
  console.log("alguien hizo una solicitud get a la ruta de prueba");
  res.send("Hola mundo desde el backend");
};

export const crearProducto = async (req, res) => {
  try {
    //extraer el producto del body de la solicitud (req)
    //validar los datos del body
    //crear un objeto con el modelo producto Producto
    const productoNuevo = new Producto(req.body);
    //guardar el objeto en la BD
    await productoNuevo.save();
    //enviar la respuesta que pudimos crear el producto
    res.status(201).json({ mensaje: "El producto fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo crear el producto" });
  }
};
export const listarProductos = async (req, res) => {
  try {
    //pedir a la BD la coleccion de productos
    const productos = await Producto.find();
    //enviar la respuesta que pudimos crear el producto
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo crear el producto" });
  }
};

export const editarProducto = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);
    //validar los datos del body
    //buscar si el producto existe
    const productoBuscado = await Producto.findById(req.params.id);
    console.log(productoBuscado);
    //en caso que el producto no exista contesto con un error 404
    if (!productoBuscado) {
      return res
        .status(404)
        .json({ mensaje: "El producto solicitado no existe" });
    }
    //si lo encontre al producto, entonces lo edito
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    //envio respuesta al frontend
    res.status(200).json({ mensaje: "El producto fue editado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo editar el producto" });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    //verificar si el ID es valido
    const productoBuscado = await Producto.findById(req.params.id);
    //si el id no existe enviar un mensaje de error
    if (!productoBuscado) {
      return res.status(404).json({ mensaje: "El producto no fue encontrado" });
    }
    //si existe el producto con el id lo borro y respondo al frontend
    await Producto.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ mensaje: "El producto fue eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo eliminar el producto" });
  }
};


export const obtenerProducto = async (req, res)=>{
   try {
      //verificar si el producto existe
      const productoBuscado = await Producto.findById(req.params.id)
      //si no existe envio un mensaje de error 404
      if(!productoBuscado){
         return res.status(404).json({mensaje: 'El producto no fue encontrado'})
      }
      //si existe devolver el producto
      res.status(200).json(productoBuscado)
   } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error, no se obtener el producto" });
   }
}