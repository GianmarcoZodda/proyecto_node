import {Router} from "express"
import userController from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const userRoutes =  Router();


//instanciamos el controller del user
const UserController = new userController();

//aca va el abm de user (sin implementar, la logica en el controller)
//despues de /users (definido en el archivo routes), agrego lo que va en la url

userRoutes.post("/", UserController.createUser);
userRoutes.post("/login", UserController.login);
userRoutes.use(validateLogin)
userRoutes.post("/logout", UserController.logout);
userRoutes.get("/", UserController.indexUser);
userRoutes.get("/me", UserController.me);
userRoutes.get("/:id", UserController.detailsUser);
userRoutes.delete("/:id", UserController.deleteUser);
userRoutes.put("/:id", UserController.editUser);

export default userRoutes