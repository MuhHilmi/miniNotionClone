require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const blockRoutes = require("./routes/blockRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // wajib supaya cookie httpOnly bisa dikirim cross-origin
  })
);

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Endpoint akan diimplementasikan penuh di sesi "backend"
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/blocks", blockRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend jalan di http://localhost:${PORT}`));
