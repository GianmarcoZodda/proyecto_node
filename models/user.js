import { DataTypes, Model } from "sequelize";
import validationMessages from "../helpers/errors.js"
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
        msg: validationMessages.required("name")
        },
        len: {
            args: [2, 40],
            msg: validationMessages.length("name", 2, 40)
        },
      },
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
            msg: validationMessages.required("surname")
            },
            len: {
                args: [2, 40],
                msg: validationMessages.length("surname", 2, 40)
            },
          },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: validationMessages.isEmail("email")
        },
        notNull: {
          msg: validationMessages.required("email")
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
        msg: validationMessages.required("password")
        },
        len: {
            args: [8, 20],
            msg: validationMessages.length("password", 8, 20)
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