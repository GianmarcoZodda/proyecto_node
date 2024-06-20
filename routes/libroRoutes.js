import {Router} from "express"
import libroController from "../Controllers/libroController.js";
import esEmpleado from "../middlewares/esEmpleado.js";
import { validateLogin } from "../middlewares/validateLogin.js";


const libroRoutes =  Router();

//se debe instanciar el controller
//const LibroController = new libroController()


//aca va el abm (sin implementar, la logica en el controller)
libroRoutes.get("/", libroController.indexLibro);
libroRoutes.get("/:id", libroController.detailsLibro);

libroRoutes.use(validateLogin);
libroRoutes.use(esEmpleado);
libroRoutes.post("/", libroController.createLibro);
libroRoutes.delete("/:id", libroController.deleteLibro);
libroRoutes.put("/:id", libroController.editLibro);



export default libroRoutes






