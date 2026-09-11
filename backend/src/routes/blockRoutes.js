const express = require("express");
const router = express.Router();
const blockController = require("../controllers/blockController");
const { requireAuth } = require("../middleware/authMiddleware");

router.use(requireAuth);

router.post("/", blockController.create);
router.put("/:id", blockController.update);
router.delete("/:id", blockController.remove);
router.post("/reorder", blockController.reorder);

module.exports = router;
