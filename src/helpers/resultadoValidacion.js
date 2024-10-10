import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next)=>{
    const errors = validationResult(req)
    //errors.isEmpty() true en el caso que esta vacio, false cuando hay errores
    //si hay algun error en la validacion
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    //quiero que siga con la siguiente ejecucion
    next()
}

export default resultadoValidacion;