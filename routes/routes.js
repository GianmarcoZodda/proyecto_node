import {Router} from "express"
import userRoutes from "./userRoutes.js"
import rolRoutes from "./rolRoutes.js"
//import methodLogger from "../middlewares/methodLogger.js";

const routes = Router()

//routes.use(methodLogger)
//para todas las rutas definidas aca abajo, se utiliza el methodlogger
routes.use("/users", userRoutes)
routes.use("/rols", rolRoutes)
//routes.use("/libros", libroRoutes)
//routes.use("/prestamos", prestamoRoutes)

//agregar las rutas de las entidades faltantes. las rutas de los abm de cada entidad van en su propio archivo


export default routes