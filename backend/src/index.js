const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors()); // configure cors

//bring in db config
require("./config/db")(app);
//db config ends here

//configure body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//configure body-parser ends here

app.use(morgan("dev")); // configire morgan

const userRoutes = require("./account/userRoute");
const organizationRoutes = require("./organization/organizationRoute");
const departmentRoutes = require("./department/departmentRoute");
const employeeRoutes = require("./employee/employeeRoute");
app.use("/user", userRoutes);
app.use("/organization", organizationRoutes);
app.use("/department", departmentRoutes);
app.use("/employee", employeeRoutes);

// define first route
app.get("/", (req, res) => {
    console.log("first route");
});
// this looks cool
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});