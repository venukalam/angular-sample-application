const express = require("express");
const router = express.Router();
const departmentController = require("./departmentController");
const auth = require("../middleware/auth")

router.post("/", departmentController.addDepartment);
router.patch("/", departmentController.updateDepartment);
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;