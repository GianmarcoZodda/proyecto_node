import { DataTypes, Model } from "sequelize";
import validationMessages from "../helpers/errors.js"
import connectionDb from "../connection/connectionDb.js";

class libro extends Model {}

libro.init (
    {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: validationMessages.required
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: validationMessages.required
        },
      },
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: validationMessages.isInt
        },
      },
    },
},
    {
        sequelize: connectionDb,
        modelName: "libro",
    }

);

export default libro;
  