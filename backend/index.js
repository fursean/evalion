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
const tasksRouter = require("./routes/tasks");

app.use("/api", authRoutes);                      
app.use("/api/modules", modulesRoute);
app.use("/api/tests", testsRouter);
app.use("/api/tasks", tasksRouter);

// Test-rute
app.get("/", (req, res) => {
  res.send("Evalion backend is running!");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});

console.log("✅ Backend er koblet til Supabase:", process.env.SUPABASE_URL);
