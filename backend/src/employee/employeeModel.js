const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    organization_name: {
        type: String,
        required: true
    },
    department_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    work_title: {
        type: String,
        required: true
    },
    total_experience: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Employee", employeeSchema);
employeeSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});