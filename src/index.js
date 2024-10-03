const express = require("express");
const router = require("./routes/api/v1/index"); 
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  })
);


app.use(express.json());

app.use("/api/v1", router);

 app.use(cookieParser());

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
