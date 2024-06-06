import {Sequelize} from "sequelize"
 
const connectionDb = new Sequelize("test", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

export default connectionDb