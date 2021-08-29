const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    organization_name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Organization", organizationSchema);
organizationSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});