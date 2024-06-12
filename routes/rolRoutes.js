import {Router} from "express"
import rol from "../models/rol.js"


const rolRoutes =  Router();


//se debe instanciar el controller

//aca va el abm (sin implementar, la logica en el controller)



rolRoutes.get("/", async (req, res) => {
    const roles = await rol.findAll();
    res.status(200).send({success: true, message: roles});
});

export default rolRoutes