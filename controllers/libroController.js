import  libro from "../models/libro.js"; 


class libroController{

    
    indexLibro = async (req, res) => {
        try {
            const libros = await libro.findAll({
              attributes: ["id", "title", "author", "publishedYear"]
            });
            res.status(201).send({
              success: true,
              message: libros,
            });
          } catch (error) {
            console.log("fallo algo")
            res.status(400).send({ succces: false, message: error.message });
          }
    }


    createLibro = async (req, res) => {
        try {
            //el req tiene un monton de cosas, se desestructura para tomar solo lo que necesitamos
          const { title, author, publishedYear } = req.body;
        
          const newLibro = await libro.create({
            title,
            author,
            publishedYear,
          });
          //201, creado correctamentee
        
          res.status(201).send({
            success: true,
            message: `Libro ${newLibro.title} creado con exito`,
          });
        } catch (error) {
            //400, error 
          res.status(400).json({ succces: false, error: error.message });
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
              res.status(404).json({ succces: false, error: error.message });
              console.log("no existe con ese id")
            }

          } catch (error) {
            res.status(500).json({ succces: false, error: error.message });
            console.log("2")
            console.log("error del server")
          }
        }
        
  /*       
       buscarLibroPorTitulos = async (title) => {
            try {
              const Libro = await libro.findOne({ where: { title } });
          
              // Ver si se encontró el libro
              if (Libro) {
                return { success: true, Libro };
              } else {
                return { success: false, message: "No hay ningún libro con ese título" };
              }
            } catch (error) {
           
              return { success: false, message: error.message };
            }
          }; */
          
        
        deleteLibro = async (req, res) => {

            try {
                const { id } = req.params;
                console.log("el id es: "+id);
                const libroToDestroy = await user.findByPk(id, {
                  attributes: ["title", "author", "publishedYear"]
                });
                console.log("erl nombre del user a destruir: "+userToDestroy.name)
                if(libroToDestroy){
                    //elimino Libro
                    await libro.destroy({where: {id}});
                    res.status(204).json({ success: true, message:  `El libro ya no existe`});
                    console.log("Libro destruido")
                }else{
                    res.status(404).json({ success: false, message: `El libro no se encuentra`});
                }
            } catch (error) {
              console.log("el error es: "+error.message)
                res.status(500).json({ success: false, error: error.message });
            }

        }

        
        async buscarLibroPorTitulos(title) {
          try {
              const Libro = await libro.findOne({ where: { title } });
              if (Libro) {
                  return Libro;
              } else {
                  throw new Error("No hay ningún libro con ese título");
              }
          } catch (error) {
              throw new Error(error.message);
          }
      }
  }
  
  export default new libroController();