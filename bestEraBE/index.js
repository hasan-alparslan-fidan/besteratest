require('dotenv').config(); 
const express = require("express");
const app = express();
const authRoutes = require('./routes/authRoutes');

const port = process.env.PORT;

app.use(express.json());
console.log("port : ", port);

// routes
app.use('/test', authRoutes );

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
