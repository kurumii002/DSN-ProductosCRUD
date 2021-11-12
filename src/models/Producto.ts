import { Document, Schema, model } from "mongoose";

interface IProducto extends Document {
	nombre: string;
	marca: string;
	precio_venta: number;
	precio_compra: number;
	pais_procedencia: string;
	url_imagen: string;
}

const ProductoSchema= new Schema<IProducto>({
	nombre: {
		type: String,
		required: true,
	},
	marca: {
		type: String,
		required: true,
	},
	precio_venta: {
		type: Number,
		required: true,
	},
	precio_compra: {
		type: Number,
		required: true,
	},
	pais_procedencia: {
		type: String,
		required: true,
	},
	url_imagen: {
		type: String,
		required: true,
	}
});

export const Producto = model<IProducto>("Producto", ProductoSchema);