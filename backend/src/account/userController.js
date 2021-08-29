const User = require("./userModel");
const Department = require("../department/departmentModel");
const Employee = require("../employee/employeeModel");
const Organization = require("../organization/organizationModel");

exports.registerNewUser = async (req, res) => {
    try {

        let user = new User({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email
        })
        user.password = await user.hashPassword(req.body.password);
        let createdUser = await user.save();
        res.status(200).json({
            msg: "New user created",
            data: createdUser
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.loginUser = async (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        let user = await User.findOne({
            email: login.email
        });

        //check if user exist
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }

        let match = await user.compareUserPassword(login.password, user.password);
        if (match) {
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: 604800
            })

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.analytics = async (req, res) => {
    try {
        var d = new Date();
        d.setMonth(d.getMonth() - 1); //1 month ago

        let orgCount = await Organization.find().count();
        let depCount = await Department.find().count();
        let empCount = await Employee.find().count();
        let orgReport = await Organization.find({ createdAt: { $gte: d } }, { createdAt: 1 });
        let depReport = await Department.find({ createdAt: { $gte: d } }, { createdAt: 1 });
        let empReport = await Employee.find({ createdAt: { $gte: d } }, { createdAt: 1 });

        res.status(200).json({
            success: true,
            counts: {
                orgCount,
                depCount,
                empCount
            },
            reports: {
                orgReport,
                depReport,
                empReport
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}