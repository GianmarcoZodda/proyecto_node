// Middleware para verificar el rol de empleado
const esEmpleado = (req, res, next) => {
    console.log(req)
    console.log("--------------")
    if (req.user && req.user.email === 'empleado@gmail.com') {
        return next();
    }
    return res.status(403).json({ success: false, message: 'No autorizado porque no sos un empleado' });
};

export default esEmpleado;