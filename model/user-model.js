const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.validatePassword = async (pwd, epwd) => {
    return await bcrypt.compare(pwd, epwd);
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    const hash = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, hash);
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;