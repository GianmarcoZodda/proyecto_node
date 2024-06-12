import { rol } from "../models/model.js";

const rolSeed = async () => {
  try {
    await rol.bulkCreate([
      { name: "admin" },
      { name: "empleado" },
      { name: "lector" },
    ]);
  } catch (error) {
    console.log(`🚀 ~ rolSeed ~ error:`, error);
  }
};

export default rolSeed ;