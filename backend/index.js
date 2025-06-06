const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importer routes
const modulesRoute = require("./modules");
app.use("/api/modules", modulesRoute);

// Test-rute
app.get("/", (req, res) => {
  res.send("Evalion backend is running!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
