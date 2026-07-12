const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../repositories/userRepository");

const login = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user)
        throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid)
        throw new Error("Invalid email or password");

    const token = jwt.sign(
        {
            id: user.employee_id,
            role: user.role_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

    return {
        token,
        user
    };
};

module.exports = {
    login
};