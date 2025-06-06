const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importer og bruk routes
const authRoutes = require("./routes/auth");       
const modulesRoute = require("./modules");
const testsRouter = require("./routes/tests");

app.use("/api", authRoutes);                      
app.use("/api/modules", modulesRoute);
app.use("/api/tests", testsRouter);

// Test-rute
app.get("/", (req, res) => {
  res.send("Evalion backend is running!");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});
