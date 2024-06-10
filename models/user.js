
import { DataTypes, Model } from "sequelize";
import connectionDb from "../connection/connectionDb.js";

class User extends Model {}

User.init ({
    username:{
        type:DataTypes.STRING,
        allowNull: false
    },
password:{
    type:DataTypes.STRING,
    allowNull: false
}
},
{
    sequelize: connectionDb,
    modelName: "User",
    tableName: "User",
}
);

export default User;