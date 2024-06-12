
import { DataTypes, Model } from "sequelize";
import connectionDb from "../connection/connectionDb.js";
import bcrypt from "bcrypt"

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

// Method 3 via the direct method
User.beforeCreate(async (user, options) => {
  /*   const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword; */
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const hashedPassword = await await bcrypt.hash(user.password, salt);
    console.log(hashedPassword)
    user.password = hashedPassword;
  });

export default User;