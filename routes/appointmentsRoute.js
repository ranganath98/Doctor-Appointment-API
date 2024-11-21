const express = require("express");
const {
  bookAppointment,
  viewAppointment,
  viewAppointmentsByDoctor,
  cancelAppointment,
  modifyAppointment,
} = require("../controllers/appointmentsController");

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/view/:email", viewAppointment);
router.get("/doctor/:doctorName", viewAppointmentsByDoctor);
router.delete("/cancel", cancelAppointment);
router.put("/modify", modifyAppointment);

module.exports = router;
