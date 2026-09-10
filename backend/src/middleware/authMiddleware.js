// TODO (sesi backend): verifikasi JWT dari cookie httpOnly
// const jwt = require("jsonwebtoken");
//
// function requireAuth(req, res, next) {
//   const token = req.cookies[process.env.COOKIE_NAME];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = payload; // { id, email }
//     next();
//   } catch {
//     return res.status(401).json({ message: "Token tidak valid" });
//   }
// }
//
// module.exports = { requireAuth };
