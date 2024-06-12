import User from "../models/user.js"

class UserController {

createUser = async (req, res) => {
    
    try {

        const {username, password} = req.body
        const data = User.create( {username, password})
        res.status(201).send({success:true, message:data})
    } catch (error) {
        res.status(404).send({success:false, message:error.message})
    }
}

leerUsuarios = async (req, res) => {
    try {

        const {username, password} = req.body
        const data = await User.findAll({username})
        res.status(201).send({success:true, message:data})
    } catch (error) {
        res.status(404).send({success:false, message:error.message})
    }
}

leerUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByPk(id);
        if (!data) {
            return res.status(404).send({ success: false, message: "Usuario no encontrado" });
        }
        res.status(200).send({ success: true, message: data});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }}


eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByPk(id);
        if (!data) {
            return res.status(404).send({ success: false, message: "Usuario no encontrado" });
        }
        await data.destroy();
        res.status(200).send({ success: true, message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }}


    login = async (req,res) => {
        try {
            const {username, password} = req.body
            const data = await User.findOne({where:{username}});
            res.status(200).send({
                success: true,
                message: data
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }




}


export default UserController;