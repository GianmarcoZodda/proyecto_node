import { DataTypes, Model } from "sequelize";
import validationMessages from "./helpers.erros.js"
import connectionDb from "../connection/connectionDb.js";


//aca definimos los modelos como en pnt1, y le agregamos validaciones para los atributos/propiedades
class user extends Model {}

user.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
        msg: validationMessages.required
        },
        len: {
            args: [2, 40],
            msg: validationMessages.length
        },
      },
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
            msg: validationMessages.required
            },
            len: {
                args: [2, 40],
                msg: validationMessages.length
            },
          },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: validationMessages.isEmail
        },
        notNull: {
          msg: validationMessages.required
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
        msg: validationMessages.required
        },
        len: {
            args: [8, 20],
            msg: validationMessages.length
        },
      },
    },
  },
  {
    sequelize: connectionDb,
    modelName: "user",
  }
);

export default user;