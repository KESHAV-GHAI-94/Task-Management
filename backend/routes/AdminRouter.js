const express = require("express");
const AdminRouter = express.Router();
const verifyToken = require("../middleware/authmiddleware");
const {dashboard} = require("../controllers/page view/Dashboard")

//get dashboard view:
AdminRouter.get("/dashboard",verifyToken,dashboard)

module.exports = AdminRouter;