import express from "express"
import url from "url"
import path from "path"
import routes from "./routes/routes.js"
import morgan from "morgan"
import User from "./models/User.js"
import connectionDb from "./connection/connectionDb.js"


//configuracion de express y el puerto elegido
const app=express();
const PORT=3000;

//para acceder a los params del body
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//filemname y dirname ruta del archivo y directorio (carpeta) actual
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(import.meta.url)
console.log(__filename)
console.log(__dirname)


//static files
app.use(express.static("public"))

await connectionDb.sync();

app.use("/app", routes)

/* app.get("/", (peticion, res)=>{
    res.send("get ok")
})

app.post("/", (req, res)=>{
    res.send("post ok")
})
 */

//puerto de escucha
app.listen(PORT, ()=>{
    console.log("todo joia bro");
})