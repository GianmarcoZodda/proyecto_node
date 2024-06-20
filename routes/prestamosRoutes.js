import {Router} from "express"
import prestamo from "../models/prestamo.js"
import prestamoController from "../Controllers/prestamoController.js";

const prestamosRoutes =  Router();

//se debe instanciar el controller
//const PrestamoController = new prestamoController();

//aca va el abm (sin implementar, la logica en el controller)

prestamosRoutes.get("/", prestamoController.indexPrestamo);
prestamosRoutes.post("/", prestamoController.createPrestamo);

prestamosRoutes.get("/", async (req, res) => {
    const prestamos = await prestamo.findAll();
    res.status(200).send({success: true, message: roles});
})





export default prestamosRoutes

