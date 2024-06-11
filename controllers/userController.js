import  user from "../models/user.js"; 
//import bcrypt from 'bcrypt';


class userController{

    
    indexUser = async (req, res) => {
        try {
            //user.findAll es un metodo de sequelize, me trae todos los user en bd. le puedo pasar un objeto con las props qeu quiero que me traiga de la tabla
            const users = await user.findAll({
              attributes: ["name", "surname", "email", "password", "rolId"],
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
            res.status(400).send({ succces: false, message: error.message });
          }
    }


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
            rolId : 3, //le asigno el rol de lector al crearse
            password //aca tenemos que poner : hashedpassword
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
          res.status(400).send({ succces: false, error: error.message });
        }
      }

      
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
              res.status(404).send({ succces: false, error: error.message });
            }

          } catch (error) {
            res.status(500).send({ succces: false, error: error.message });
          }
        }
        
        
        editUser = async (req, res) => {

            try {
                const { id } = req.params;
            //no me guardo el email porque no quiero que pueda modificarlo
            const { name, surname, password } = req.body;
            const originalUser = await user.findByPk(id);

            if(originalUser){
                const updatedUser = await originalUser.update({
                    name,
                    surname,
                    password
                });
                res.status(200).send({succes: true, message: `El nombre del usuario ${originalUser.name} ahora es: ${updatedUser.name}`})
            }else{
                res.status(404).json({ succes: false, message: "no se encuentra el usuario con id: "+id });
            }
            } catch (error) {
                res.status(400).send({ succes: false, error: error.message });
            }

        }

        
        deleteUser = async (req, res) => {

            try {
                const { id } = req.params;
                const userToDestroy = await user.findByPk(id, {
                  attributes: ["name", "surname", "email", "password", "rolId"],
                  include: {
                    model: rol,
                    attributes: ["name"],
                  },
                });

                if(userToDestroy){
                    await user.destroy();
                    res.status(204).send({ succes: true, message:  `El usuario: ${userToDestroy.name} ya no existe`});
                }else{
                    res.status(404).send({ succes: false, message: `El usuario: ${userToDestroy.name} no se encuentra`});
                }
            } catch (error) {
                res.status(500).json({ succes: false, error: error.message });
            }

        }
}

export default userController;