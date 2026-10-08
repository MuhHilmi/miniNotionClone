const jwt = require("jsonwebtoken");

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
}

function setAuthCookie(res, token) {
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie(process.env.COOKIE_NAME || "token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

function clearAuthCookie(res) {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie(process.env.COOKIE_NAME || "token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
}

module.exports = { generateToken, setAuthCookie, clearAuthCookie };
