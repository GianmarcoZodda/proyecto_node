import { DataTypes, Model } from "sequelize";
import validationMessages from "../helpers/errors.js"
import connectionDb from "../connection/connectionDb.js";

//esta tabla en realidad se crea automaticamente cuando defino la relacion el la clase "model", pero la creo aca para poder agregarle los atributos
//de las fechas de entrega y retiro
class prestamo extends Model {}

prestamo.init(
{

    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: validationMessages.required
          },
          isDate: {
            msg: validationMessages.isDate
          }
        }
      },
      returnDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: {
            msg: validationMessages.isDate
          },
        },
      },

},
{
    sequelize: connectionDb,
    modelName: "prestamo",
}
);

export default prestamo;