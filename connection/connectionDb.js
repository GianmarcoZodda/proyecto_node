import {Sequelize} from "sequelize"
import {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_DIALECT,
    DB_HOST,
    DB_PORT,
  } from "../config/config.js"; 


const connectionDb = new Sequelize("test", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

export default connectionDb