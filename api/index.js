const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// trimmer MIDDLEWARE
const {trimmer,debugShowURL} = require('./middleware/utils')
app.use(debugShowURL);
app.use(trimmer);


const PORT = 4000;

/*
app.get("/", (req, res) => {
  res.json({ message: "Hello, CORS!" });
});
app.post("/", (req, res) => {
  res.json({ message: "Hello, CORS!" });
}); */

//const authRoute = require('./route/auth.route');
//app.use('/', authRoute);

const userRoute = require('./route/user.route');
app.use('/user', userRoute);
const surveyboxRoute = require('./route/surveybox.route');
app.use('/surveybox', surveyboxRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});