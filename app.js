const express = require("express");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointmentsRoute");

require("dotenv").config(); // environment variables

const app = express();

// middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Doctor Appointment Booking API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export the app without starting the server
