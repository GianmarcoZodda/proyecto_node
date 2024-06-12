import { DataTypes, Model } from "sequelize";
import connectionDb from "../connection/connectionDb.js";

class Book extends Model {}

Book.init ({
    Titulo:{
        type:DataTypes.STRING,
        allowNull: false
    },
Autor:{
    type:DataTypes.STRING,
    allowNull: false
}
},
{
    sequelize: connectionDb,
    modelName: "Book",
    tableName: "Book",
}
);

export default Book;