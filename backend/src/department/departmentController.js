const Department = require("./departmentModel");

exports.addDepartment = async (req, res) => {
    try {
        let department = new Department({
            organization_name: req.body.organizationName,
            department_owner: req.body.departmentOwner,
            description: req.body.description,
            working_time: req.body.workingTime,
            working_days: req.body.workingDays
        })
        let createdDepartment = await department.save();
        res.status(200).json({
            msg: "New Department created",
            data: createdDepartment
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.getAllDepartments = async (req, res) => {
    try {
        let departments = await Department.find();
        res.status(200).json({
            msg: "all Departments",
            data: departments
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}
exports.getDepartmentById = async (req, res) => {
    try {
        let department = await Department.findOne({ "_id": req.params.id });
        res.status(200).json({
            msg: "all Departments",
            data: department
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        let department = await Department.updateOne({ "_id": req.body.id },
            {
                organization_name: req.body.organizationName,
                department_owner: req.body.departmentOwner,
                description: req.body.description,
                working_time: req.body.workingTime,
                working_days: req.body.workingDays
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

exports.deleteDepartment = async (req, res) => {
    try {
        let department = await Department.deleteOne({ "_id": req.params.id });
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
