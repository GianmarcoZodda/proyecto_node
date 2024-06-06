import {Router} from "express"
import userRoutes from "./userRoutes.js"
import methodLogger from "../middlewares/methodLogger.js";

const routes = Router()

routes.use(methodLogger)
routes.use("/users", userRoutes)


export default routes