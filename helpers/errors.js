//la carpeta helper la cree para guardar archivos que nos "ayuden" en toda la aplicacion"

//en este en particular, guardo las constantes con los mensajes de error definidos para los atributos de nuestros modelos, (asi como hicimos en pnt1)


const validationMessages = {
    required: (field) => `el campo ${field}, es obligatorio`,
    length: (field, min, max) => `el campo ${field}, debe tener entre ${min} y ${max} caracteres`,
    isEmail: (field) => `el campo ${field}, debe ser un correo electrónico válido`,
    isInt: (field) => `el campo ${field}, debe ser un numero entero`,
    isDate: (field) => `${field} debe ser una fecha válida`,
  };
  
  export default validationMessages;