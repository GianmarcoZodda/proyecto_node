import {Sequelize} from "sequelize"
import {
    PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_DIALECT,
    DB_HOST,
    DB_PORT,
  } from "../config/config.js"; 


const connectionDb = new Sequelize("test", "root", "", {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: PORT
})

export default connectionDb