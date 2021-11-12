import mongoose from "mongoose";
import { config } from "dotenv";
config();

/**
 * Función para hacer la conexión a MongoDB
 */
export async function connectDatabase() {
	try {
		mongoose.connect(process.env.MONGODB_URL!);
		console.log(">>MONGODB CONECTADO");

	} catch {
		console.log(">>ERROR AL CONECTAR A MONGODB");
	}
}