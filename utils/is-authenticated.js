const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;
    const isAuth = jwt.verify(token, process.env.SECRET);
    if(isAuth) {
        next();
        return;
    }
    res.status(403).json({
        message: "Unauthorized Access"
    })
}   

module.exports = isAuthenticated;