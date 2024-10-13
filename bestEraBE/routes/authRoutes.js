const express = require("express");
const router = express.Router();
const { getCharacters } = require("../controllers/authController");

const cors = require('cors');
router.use(cors());

// POST /login route for login
router.get("/", getCharacters);

module.exports = router;
