import user from "./models/lector.js";
import rol from "./models/rol.js";


//este archivo lo uso para definir la relacion entre modelos

//un rol puede tenerlo muchos usuarios (clave foranea rolId)
rol.hasMany(user, {
  foreignKey: "rolId",
});

//un usuario puede tener un rol, (clave foranea rolId)
user.belongsTo(rol, {
  foreignKey: "rolId",
});


// creo la tabla prestamo, intermediaria entre libro y lector ( relacion de muchos a muchos)
libro.belongsToMany(user, { through: prestamo, foreignKey: 'libroId' });
user.belongsToMany(libro, { through: prestamo, foreignKey: 'lectorId' });

export { user, rol , libro, prestamo};