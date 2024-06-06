

const methodLogger = (req, res, next) =>{
    console.log(req.url);
    console.log(res.url);
    next();
}

export default methodLogger