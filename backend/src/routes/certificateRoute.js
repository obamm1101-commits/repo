const express = require("express");
const { getCertificates } = require("../controllers/certificateController");

const router = express.Router();

router.get("/", getCertificates);

module.exports = router;