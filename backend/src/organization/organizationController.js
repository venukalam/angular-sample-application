const Organization = require("./organizationModel");

exports.addOrganization = async (req, res) => {
    try {
        let organization = new Organization({
            organization_name: req.body.organizationName,
            owner: req.body.owner,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        })
        let createdOrganization = await organization.save();
        res.status(200).json({
            msg: "New organization created",
            data: createdOrganization
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.getAllOrganizations = async (req, res) => {
    try {
        let organizations = await Organization.find();
        res.status(200).json({
            msg: "all organizations",
            data: organizations
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}
exports.getOrganizationById = async (req, res) => {
    try {
        let organization = await Organization.findOne({ "_id": req.params.id });
        res.status(200).json({
            msg: "all organizations",
            data: organization
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.updateOrganization = async (req, res) => {
    try {
        let organization = await Organization.updateOne({ "_id": req.body.id },
            {
                organization_name: req.body.organizationName,
                owner: req.body.owner,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
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

exports.deleteOrganization = async (req, res) => {
    try {
        let organization = await Organization.deleteOne({ "_id": req.params.id });
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
