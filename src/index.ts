//encargado de ejecutar la aplicacion
import { Application } from "./app";
import { sequelizeConnection } from "./database";
import { Producto } from "./models/Producto";
import { connectCloudinary } from "./cloudinary";

//iniciando el servidor
try {
	sequelizeConnection.authenticate()
		.then(() => console.log(">>>DB CONECTADA"));
	Producto.sync();
	
	connectCloudinary();

	new Application().start();

} catch (error) {
	console.log(error);
	process.exit(1);
}