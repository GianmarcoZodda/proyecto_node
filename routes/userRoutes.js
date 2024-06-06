import {Router} from "express"


const userRoutes =  Router()

//aca va el abm de user - get create delete edit details


//ejemplo

//ruteo
userRoutes.get("/", (req,res)=>{
    res.status(200).send("get ok");
});

userRoutes.post("/", (req, res)=>{
    res.send("post ok")
})

export default userRoutes