import express from "express"
//import url from "url"
//import path from "path"
import routes from "./routes/routes.js"
//import morgan from "morgan"
import connectionDb from "./connection/connectionDb.js"
import {errorNotFound} from "./middlewares/errorNotFound.js";
import rolSeed from "./seed/rolSeed.js";
import empleadoSeed from "./seed/empleadoSeed.js";
import {PORT} from "./config/config.js";
import cookieParser from "cookie-parser";



//configuracion de express y el puerto elegido
const app=express();

//para acceder a los params del body
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())


//filemname y dirname ruta del archivo y directorio (carpeta) actual
//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//console.log(import.meta.url)
//console.log(__filename)
//console.log(__dirname)


//static files
//app.use(express.static("public"))

//rutas del proyecto
app.use("/app", routes)

//cuando hay un error, uso:
app.use(errorNotFound);


//conexion a la bd
//el force:true hace que se dropee la bd cada vez q hago un cambio, y la vuelve a generar
await connectionDb.sync({ force: true });

//creeamos los roles al iniciar la app y agregamos el empleado
await rolSeed();
await empleadoSeed();


//puerto de escucha
app.listen(PORT, ()=>{
    console.log("funciona en: "+PORT);
})