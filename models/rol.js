import { DataTypes, Model } from "sequelize";
import connectionDb from "../connection/connectionDb.js";


//no le agrego el validate dentro de los atributos ya que no se van a crear los roles desde el cliente, ya vienen precargados por el seed
class rol extends Model {}

rol.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connectionDb,
    modelName: "rol",
  }
);

export default rol;
