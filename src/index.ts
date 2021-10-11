//encargado de ejecutar la aplicacion
import App from "./app";
import database from "./database";

//iniciando el servidora
database();
const app = new App();
app.start();
