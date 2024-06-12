import {Router} from "express"
import connectionDb from "../connection/connectionDb.js";
import UserController from "../Controllers/UserController.js";

const userController = new UserController();


const userRoutes =  Router()

//aca va el abm de user - get create delete edit details

//ejemplo

//ruteo
/* userRoutes.get("/", async (req,res)=>{
    try {
        const query = "SELECT id, username FROM usuario";
        const[data] = await connectionDb.query(query)
        console.log(data)
          res.status(200).send({sucess: true, message: data});
    } catch (error) {
        res.status(400).send({sucess: false, message: error});
    }
  
}); */

userRoutes.post("/",userController.createUser)
userRoutes.post("/login",userController.login)
userRoutes.get("/",userController.leerUsuarios)
userRoutes.get("/:id", userController.leerUsuario)
userRoutes.put("/:id")
userRoutes.delete("/:id", userController.eliminarUsuario)


export default userRoutes