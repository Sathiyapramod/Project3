//start of code

import express from "express";
const app = express();

const PORT = 4000;

app.get("/", (request, response) => {
  response.send({ message: "Welcome to Demo Page" });
});

app.listen(PORT, () =>
  console.log(`The Server is running on the port : ${PORT} 😉`)
);

//end of code