const express = require("express");
const router = express.Router();

const ContactController = require("../controllers/ContactController");

router.post("/submit", ContactController.submit);
router.delete("/deleteContract/:slug", ContactController.deleteContract);
router.get("/getDatelineFix/:slug", ContactController.getDatelineFix);
router.post("/updateDateline/:slug", ContactController.updateDateline);
router.get("/getDateline/:slug", ContactController.getDateline);
router.get("/getBranch/:slug", ContactController.getBranch);

router.get("/", ContactController.index);

module.exports = router;
