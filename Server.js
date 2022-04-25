const express = require("express");

const port = process.env.PORT || 5000;

//  CORS is a node.js package for providing a Connect/Express middleware
//  that can be used to enable CORS with varstious options.
const cors = require("cors");

// BodyParser ensure the req.body is in json form data.
const bodyParser = require("body-parser");


// import the Database 
const dbConnection = require("./config/Db");




const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());


// call the Database
dbConnection();



// Routes List

const signupRouter = require("./components/signup/SignupRoute")
const signinRouter = require("./components/signin/SigninRoute")


const adminRouter = require("./components/admin/allUser/AllUserRoute")


const userRouter = require("./components/user/UserRoutes")

const dashboardRouter = require("./components/admin/dashboard/DashboardRoute")

// Define the Api's

app.get("/", function (req, res) {
  req.clientData;
  // logics main server
  res.send("Server is working ");
});
console.log("server.js");
app.use("/auth", signupRouter);
app.use("/auth", signinRouter);


app.use("/admin", adminRouter);

app.use("/user", userRouter);


app.use("/dashboard", dashboardRouter)



// server port listener
app.listen(port, (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log("server is working on port, 5000");
  }
});
