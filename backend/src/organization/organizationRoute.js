const express = require("express");
const router = express.Router();
const organizationController = require("./organizationController");
const auth = require("../middleware/auth")

router.post("/", organizationController.addOrganization);
router.patch("/", organizationController.updateOrganization);
router.get("/", organizationController.getAllOrganizations);
router.get("/:id", organizationController.getOrganizationById);
router.delete("/:id", organizationController.deleteOrganization);

module.exports = router;