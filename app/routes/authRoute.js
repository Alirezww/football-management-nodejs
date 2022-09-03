const router = require("express").Router();

router.get("/login", (req, res, next) => {
    return res.json({message:"login page"});
})

router.get("/register", (req, res, next) => {
    return res.json({message:"register page"});
})

module.exports = router