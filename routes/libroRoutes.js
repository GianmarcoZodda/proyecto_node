import {Router} from "express"
import libro from "../models/libro.js"
import libroController from "../Controllers/libroController.js";

const libroRoutes =  Router();
//se debe instanciar el controller


//aca va el abm (sin implementar, la logica en el controller)


libroRoutes.post("/", libroController.createLibro);
libroRoutes.get("/", libroController.indexLibro);

libroRoutes.get("/", async (req, res) => {
    const libros = await libro.findAll();
    res.status(200).send({success: true, message: roles});
})





export default libroRoutes






