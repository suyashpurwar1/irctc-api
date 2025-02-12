const express = require("express");
const {
  addTrain,
  getSeatAvailability,
} = require("../controllers/trainController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/trains", authenticateToken, isAdmin, addTrain);
router.get("/availability", getSeatAvailability);

module.exports = router;
