import {Router} from "express"
import libro from "../models/libro.js"
import libroController from "../Controllers/libroController.js";
import esEmpleado from "../middlewares/esEmpleado.js";
import { validateLogin } from "../middlewares/validateLogin.js";


const libroRoutes =  Router();

//se debe instanciar el controller
const LibroController = new libroController()


//aca va el abm (sin implementar, la logica en el controller)
libroRoutes.get("/", LibroController.indexLibro);
libroRoutes.get("/:id", LibroController.detailsLibro);

libroRoutes.use(validateLogin);
libroRoutes.use(esEmpleado);
libroRoutes.post("/", LibroController.createLibro);
libroRoutes.delete("/:id", LibroController.deleteLibro);
libroRoutes.put("/:id", LibroController.editLibro);



export default libroRoutes






