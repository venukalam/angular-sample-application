const express = require("express");
const router = express.Router();
const employeeController = require("./employeeController");
const auth = require("../middleware/auth")

router.post("/", employeeController.addEmployee);
router.patch("/", employeeController.updateEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;