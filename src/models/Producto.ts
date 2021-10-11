import { Schema, Model, model } from "mongoose";

const ProductoSchema = new Schema({
	nombre:{
		type: String, 
		required: true,
	},
	marca:{
		type: String, 
		required: true,
	},
	precio_venta:{
		type: Number, 
		required: true,
	},
	precio_compra:{
		type: Number, 
		required: true,
	},
	pais_procedencia:{
		type: String, 
		required: true,
	}
});

export default model("Producto", ProductoSchema);