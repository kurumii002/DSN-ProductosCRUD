import mongoose from "mongoose";

async function connect(){
    try{
        mongoose.connect("mongodb://localhost/dsn_lab8");
        console.log(">>MONGODB CONECTADO");

    }catch{
        console.log(">>ERROR AL CONECTAR A MONGODB");
    }
}

export default connect;
