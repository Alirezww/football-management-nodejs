class AuthController {

    async login(req, res, next){
        try{
            return res.json(req.body)
        }catch(err){
            next(err);
        }
    }

    async register(req, res, next){
        try{
            return res.json(req.body)
        }catch(err){
            next(err);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}