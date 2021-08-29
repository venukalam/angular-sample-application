const Employee = require("./employeeModel");

exports.addEmployee = async (req, res) => {
    try {
        let employee = new Employee({
            organization_name: req.body.organizationName,
            department_name: req.body.departmentName,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            dob: req.body.dob,
            work_title: req.body.workTitle,
            total_experience: req.body.totalExperience
        })
        let createdEmployee = await employee.save();
        res.status(200).json({
            msg: "New Employee created",
            data: createdEmployee
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.getAllEmployees = async (req, res) => {
    try {
        let employees = await Employee.find();
        res.status(200).json({
            msg: "all Employees",
            data: employees
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}
exports.getEmployeeById = async (req, res) => {
    try {
        let employee = await Employee.findOne({ "_id": req.params.id });
        res.status(200).json({
            msg: "all Employees",
            data: employee
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        let employee = await Employee.updateOne({ "_id": req.body.id },
            {
                organization_name: req.body.organizationName,
                department_name: req.body.departmentName,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                dob: req.body.dob,
                work_title: req.body.workTitle,
                total_experience: req.body.totalExperience
            });
        res.status(200).json({
            msg: "successfully updated"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        let employee = await Employee.deleteOne({ "_id": req.params.id });
        res.status(200).json({
            msg: "successfully deleted"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}
