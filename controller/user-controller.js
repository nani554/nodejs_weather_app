const userModel = require("../model/user-model");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const registration = async (req, res, next) => {
    // console.log(req.body);
    const { username, email } = req.body;
    const user = await userModel.findOne({ username });
    // console.log(user);
    if (user) {
        res.status(400).json({
            message: "User already Exists"
        })
        return;
    }
    const newUser = new userModel(req.body);
    newUser.save();
    // console.log(omitProperty(newUser, "password"));
    // res.json(omitProperty(newUser, "password"));
    res.json({username, email});
}

const authentication = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        res.status(400).json({
            message: "User dont exists"
        })
        return;
    }

    if(!user.validatePassword(password, user.password)) {
        res.status(401).json({
            message: "Authentication Failed"
        })
        return;
    }
    const accessToken = getToken(user);
    const refreshToken = getToken(user);
    // res.json(_.assign(omitProperty(user, "password"), { accessToken, refreshToken }));
    res.json(_.assign(_.pick(user, ["username", "email"]), { accessToken, refreshToken }));
}

// function omitProperty(objMap, property) {
//     const temp = _.omit(objMap, property); 
//     console.log(temp);
//     return temp;
// }

function getToken(userMap) {
    return jwt.sign(_.pick(userMap, ['username', 'email', 'password']), process.env.SECRET);
}


module.exports = {
    authentication,
    registration
}