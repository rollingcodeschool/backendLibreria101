import Producto from "../database/model/producto.js"

Producto
export const funcionPrueba = (req, res)=>{
    console.log('alguien hizo una solicitud get a la ruta de prueba')
    res.send('Hola mundo desde el backend')
}

export const crearProducto = async(req, res)=>{
   try {
    //extraer el producto del body de la solicitud (req)
    //validar los datos del body
    //crear un objeto con el modelo producto Producto
    const productoNuevo = new Producto(req.body);
    //guardar el objeto en la BD
    await productoNuevo.save()
    //enviar la respuesta que pudimos crear el producto
    res.status(201).json({mensaje:'El producto fue creado correctamente'})
   } catch (error) {
    console.error(error)
    res.status(500).json({mensaje: 'Ocurrio un error, no se pudo crear el producto'})
   }
   
}