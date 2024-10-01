import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
    nombreProducto:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
        unique:true
    },
    precio:{
        type:Number,
        required:true,
        min:50,
        max:1000000
    }
})