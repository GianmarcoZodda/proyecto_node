import user from "../models/user.js";
import rol from "../models/rol.js";
import { generateToken } from "../utils/token.js";
import libroController from "../Controllers/libroController.js";
import prestamoController from "../Controllers/prestamoController.js";

class userController {
  indexUser = async (req, res) => {
    try {
      //user.findAll es un metodo de sequelize, me trae todos los user en bd. le puedo pasar un objeto con las props qeu quiero que me traiga de la tabla
      const users = await user.findAll({
        attributes: ["id", "name", "surname", "email", "password", "rolId"],
        include: {
          //include mete una consulta conjunta entre las tablas (join)
          model: rol,
          attributes: ["name"],
        },
      });
      res.status(201).send({
        success: true,
        message: users,
      });
    } catch (error) {
      console.log("fallo algo");
      res.status(400).send({ succces: false, message: error.message });
    }
  };

  reservarLibro = async (req, res) => {
    try {
      const userId = req.user.id;
      const { title } = req.body;
      const foundLibro = await libroController.buscarLibroPorTitulos(title);
      console.log(foundLibro);
      if (!foundLibro) {
        throw new Error("Este título no se encuentra.");
      }

      //const { userId } = req.body; // Hay que modificar esta manera de obtener el id
      const borrowDate = new Date(); // Fecha del préstamo
      const returnDate = null; // La devolución debe ser null para actualizarse luego

      // Debemos crear el préstamo con estas credenciales
      console.log(foundLibro.dataValues.id);
      console.log(userId);
      console.log(borrowDate);

      const result = await prestamoController.createPrestamo(
        userId,
        foundLibro.dataValues.id,
        borrowDate
      );

      if (result.success) {
        res
          .status(201)
          .json({
            success: true,
            message: `El usuario con id "${userId}" ha reservado el libro : "${title}"}`,
          });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Error al reservar el libro" });
      }
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      //el req tiene un monton de cosas, se desestructura para tomar solo lo que necesitamos
      const { name, surname, email, password } = req.body;

      // Encriptar la contraseña
      //const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await user.create({
        name,
        surname,
        email,
        password, //aca tenemos que poner : hashedpassword
        rolId: 3, //le asigno el rol de lector al crearse
      });
      //201, creado correctamentee

      //podemos mandarlo a la consola como .json (el usuario en ese formato)
      //res.status(201).json(newUser);

      //o podemos hacer como hizo el profe:
      res.status(201).send({
        success: true,
        message: `Usuario ${newUser.name} creado con exito`,
      });
    } catch (error) {
      //400, error del cliente
      res.status(400).json({ succces: false, error: error.message });
    }
  };

  detailsUser = async (req, res) => {
    try {
      //igual que arriba, desestructuro params y agarro lo que necesito
      const { id } = req.params;

      //findByPk(id) busca por pk, el findOne() que usa el profe nos sirve para pasarle un obj y buscar por cualquier cosa
      const selectedUser = await user.findByPk(id, {
        attributes: ["name", "surname", "email", "password", "rolId"],
        include: {
          model: rol,
          attributes: ["name"],
        },
      });

      if (selectedUser) {
        res.status(200).send({
          success: true,
          message: `Usuario ${selectedUser.name} obtenido con exito`,
        });
      } else {
        res.status(404).json({ succces: false, error: error.message });
        console.log("no existe con ese id");
      }
    } catch (error) {
      res.status(500).json({ succces: false, error: error.message });
      console.log("error del server");
    }
  };

  editUser = async (req, res) => {
    try {
      const { id } = req.params;
      //no me guardo el email porque no quiero que pueda modificarlo
      const { name, surname, password } = req.body;
      const originalUser = await user.findByPk(id);

      if (originalUser) {
        const updatedUser = await originalUser.update({
          name,
          surname,
          password,
        });
        res
          .status(200)
          .send({
            succes: true,
            message: `El nombre del usuario ahora es: ${updatedUser.name}`,
          });
      } else {
        res
          .status(404)
          .json({
            succes: false,
            message: "no se encuentra el usuario con id: " + id,
          });
      }
    } catch (error) {
      res.status(400).json({ succes: false, error: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("el id es: " + id);
      const userToDestroy = await user.findByPk(id, {
        attributes: ["name", "surname", "email", "password", "rolId"],
        include: {
          model: rol,
          attributes: ["name"],
        },
      });
      console.log("erl nombre del user a destruir: " + userToDestroy.name);
      if (userToDestroy) {
        //elimino usuario
        await user.destroy({ where: { id } });
        //elimino la cookie
        res.clearCookie("token");
        res
          .status(204)
          .json({ success: true, message: `El usuario ya no existe` });
        console.log("usuario destruido");
      } else {
        res
          .status(404)
          .json({ success: false, message: `El usuario no se encuentra` });
      }
    } catch (error) {
      console.log("el error es: " + error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(req.body);
      if (!email || !password) {
        return res
          .status(400)
          .send({ success: false, message: "Email y password necesarios" });
      }

      const data = await user.findOne({ where: { email } });
      if (!data) {
        throw new Error("El usuario no existe");
      }
      const validatePassword = await data.validatePassword(password);
      if (!validatePassword) {
        throw new Error("La contraseña es incorrecta");
      }
      const payload = {
        id: data.id,
        email: data.email,
        rol: data.rol
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      console.log(token);

      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  logout = (req, res) => {
    // metodo para eliminar la cookie
    res.clearCookie("token");
    res.status(200).send({ success: true, message: "Logout exitoso" });
  };

  me = async (req, res) => {
    console.log(req.cookies.token);
    try {
      const { user } = req;

      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}
export default userController;
