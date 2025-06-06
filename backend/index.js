const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importer og bruk routes
const modulesRoute = require("./modules");
app.use("/api/modules", modulesRoute);

const testsRouter = require("./routes/tests");
app.use("/api/tests", testsRouter);  // NB! /api/tests støtter nå både GET /, POST / og GET /:id

// Test-rute (for å sjekke at backend kjører)
app.get("/", (req, res) => {
  res.send("Evalion backend is running!");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server kjører på http://localhost:${PORT}`);
});
