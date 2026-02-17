const express = require("express");
const AdminRouter = express.Router();
const verifyToken = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/authroles");
const {assignrole, removeRole} = require("../controllers/Functionalitywise/Admincontrol");
AdminRouter.post("/assign-role",verifyToken,authorizeRoles("Owner", "Maintainer"),assignrole);
AdminRouter.post("/remove-role",verifyToken,authorizeRoles("Owner", "Maintainer"),removeRole);

module.exports = AdminRouter;