const jwt = require("jsonwebtoken");

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
}

function setAuthCookie(res, token) {
    res.cookie(process.env.COOKIE_NAME || "token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

function clearAuthCookie(res) {
    res.clearCookie(process.env.COOKIE_NAME || "token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
}

module.exports = { generateToken, setAuthCookie, clearAuthCookie };
