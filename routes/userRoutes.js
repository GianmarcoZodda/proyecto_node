import {Router} from "express"


const userRoutes =  Router()

//aca va el abm de user (sin implementar, la logica en el controller)
//despues de /users (definido en el archivo routes), agrego lo que va en la url

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.indexUser);
userRoutes.get("/:id", userController.detailsUser);
userRoutes.delete("/:id", userController.removeUser);
userRoutes.put("/:id", userController.editUser);

export default userRoutes