import user from "../models/user.js";
//import bcrypt from "bcrypt";

const empleadoSeed = async () => {
  try {
    // Verificar si ya existe un empleado en la base de datos
    const existingEmpleado = await user.findOne({ where: { email: "empleado@gmail.com" } });

    // Si ya existe, no hacemos nada
    if (existingEmpleado) {
      console.log("Ya existe un empleado en la base de datos.");
      return;
    }

    // Crear el hash de la contraseña del empleado
    //const hashedPassword = await bcrypt.hash("password", 10); // Reemplaza "password" por la contraseña deseada
    //console.log("Hashed Password:", hashedPassword);

    // Crear el empleado
    await user.create({
      name: "lionel",
      surname: "messi",
      email: "empleado@gmail.com",
      password: "LeoMessi22",
      rolId: 2
    });

    console.log("Empleado creado correctamente.");
  } catch (error) {
    console.error("Error al crear el empleado:", error);
  }
};


export default empleadoSeed;