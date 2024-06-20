import prestamo from "../models/prestamo.js";
import user from "../models/user.js";
import libro from "../models/libro.js";

class prestamoController {

  createPrestamo = async (userId, libroId, borrowDate) => {

    try {
      // Busca el usuario y el libro
      const foundUser = await user.findByPk(userId);
      const foundLibro = await libro.findByPk(libroId);

  
      // Verifica si existe el usuario y el libro
      if (!foundUser || !foundLibro) {
        return { success: false, message: "El usuario o el libro no existen." };
      }
      // Crea el préstamo
      const newPrestamo = await prestamo.create({
        borrowDate,
        userId,
        libroId,
      });
  
      return { success: true, prestamo: newPrestamo };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  indexPrestamo = async (req, res) => {
    try {
        const prestamos = await prestamo.findAll({
          attributes: ["userId", "libroId", "borrowDate", "returnDate"]
        });
        
        res.status(201).send({
          success: true,
          message: prestamos,
        });
      } catch (error) {
        console.log("fallo algo")
        res.status(400).send({ succces: false, message: error.message });
      }
}

buscarPrestamoADevolver = async(userId, libroId)=> {
  try {
    const prestamo1 = await prestamo.findOne({ 
      where: { 
        userId,
        libroId,
        returnDate: null // Si no es null, significa qu ya fue devuelto
      } 
    });
    
    if (prestamo1) {
      return prestamo1;
    } else {
      throw new Error("No hay ningún préstamo activo para este usuario y libro.");
    }
  } catch (error) {
    throw new Error("Error al buscar el préstamo activo.");
  }
}



};


export default new prestamoController();
