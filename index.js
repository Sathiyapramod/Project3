//start of code

import express from "express";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

const PORT = 4000;

app.get("/", (request, response) => {
  response.send({ message: "Welcome to Demo Page" });
});

async function Hashing(input) {
  const no_of_rounds = 10;
  const salt = await bcrypt.genSalt(no_of_rounds);
  const hashedPassword = await bcrypt.hash(input, salt);
  return hashedPassword;
}

app.post("/signup", async (request, response) => {
  const { username, password } = request.body;
  if (username == null || password == null)
    response.status(401).send({ message: "Enter valid credentials 😮" });
  else {
    const hashedPassword = await Hashing(password);
    const newUserSignup = await client
      .db("demo")
      .collection("users")
      .insertOne({
        username,
        password: hashedPassword,
      });
    newUserSignup
      ? res.send({ message: "New User Registered Successfully" })
      : res.status(401).send({ message: "failed to register user" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const checkUserinDB = await client
    .db("demo")
    .collection("users")
    .findOne({ username });
  if (!checkUserinDB) res.status(401).send({ message: "User Doesn't exists" });
  else {
    const storedPassword = checkUserinDB.password;
    const isPasswordValid = await bcrypt.compare(password, storedPassword);
    if (!isPasswordValid)
      res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: checkUserinDB._id }, process.env.SECRET_KEY);
    res.send({ message: "login success", token });
  }
});

app.listen(PORT, () =>
  console.log(`The Server is running on the port : ${PORT} 😉`)
);

//end of code
