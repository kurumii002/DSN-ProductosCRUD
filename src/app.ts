import express from "express";
import exphbs from "express-handlebars";
import path from "path";

//importar rutas
import indexRoutes from "./routes";
import productosRoutes from "./routes/productos";

class Application {
	app: express.Application; //instancia de express

	constructor() {
		this.app = express(); //express se va a ejecutar
		this.settings();
		this.middlewares();
		this.routes();
	}

	//METODOS
	settings() {
		//establecer variables en express
		this.app.set("port", 3000);
		this.app.set("views", path.join(__dirname, "views"));

		console.log(path.join(__dirname, "views"))

		//configurar la plantillas
		this.app.engine(".hbs", exphbs({
			defaultLayout: "main",
			layoutsDir: path.join(this.app.get("views"), "layouts"),
			partialsDir: path.join(this.app.get("views"), "partials"),
			extname: ".hbs"
		}));
		this.app.set("view engine", ".hbs");
	}

	middlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	routes() {
		this.app.use(indexRoutes); //usar las rutas importadas
		this.app.use("/productos", productosRoutes);
	}

	start() {
		this.app.listen(this.app.get("port"), () => {
			console.log(`Escuchando en puerto ${this.app.get("port")}`);
		});
	}
}

export default Application;
