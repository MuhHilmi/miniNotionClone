const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { requireAuth } = require("../middleware/authMiddleware");

router.use(requireAuth);

router.get("/", noteController.getAll);
router.post("/", noteController.create);
router.get("/:id", noteController.getOne);
router.put("/:id", noteController.update);
router.delete("/:id", noteController.remove);

module.exports = router;
