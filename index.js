const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port =  8080; // Use the provided port or default to 9000
const uri = 'mongodb+srv://mantashatabassum16409:PasmreqTq9ZdbHxo@cluster0.7cdc8tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// Middleware
app.use(cors({
  origin: ["http://localhost:3000"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: Number, required: true }
});

const User = mongoose.model("User", userSchema);

// Add a new user
app.post("/addNewUser", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const user = new User({ name, email, contact });
    await user.save();
    console.log("User added successfully:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
