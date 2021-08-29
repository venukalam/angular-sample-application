const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    organization_name: {
        type: String,
        required: true
    },
    department_owner: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    working_time: {
        type: String,
        required: true
    },
    working_days: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Department", departmentSchema);
departmentSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});