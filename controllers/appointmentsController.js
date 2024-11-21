const {
  addAppointment,
  getAppointments,
  findAppointment,
  findAppointmentsByDoctor,
  deleteAppointment,
  modifyAppointmentData,
  isValidDoctor,
  isTimeSlotAvailable,
  generateAppointmentId,
  doctors,
} = require("../data/dataStore");

const { v4: uuidv4 } = require("uuid");

const bookAppointment = (req, res) => {
  const { firstName, lastName, email, timeSlot, doctorName } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !timeSlot || !doctorName) {
    return res.status(400).send({ error: "All fields are required" });
  }

  // Validate doctor's name
  if (!isValidDoctor(doctorName)) {
    return res.status(400).json({
      error: `Invalid doctor's name`,
    });
  }

  // Check if the patient already has an appointment at the specified time slot across all doctors
  for (let doctor in doctors) {
    const existingAppointment = doctors[doctor].appointments.find(
      (appointment) =>
        appointment.email === email && appointment.timeSlot === timeSlot
    );

    if (existingAppointment) {
      // console.log(`You have already booked an appointment at ${timeSlot}. Please choose a different time.`);
      return res.status(400).json({
        error: `You have already booked an appointment at ${timeSlot}. Please choose a different time.`,
      });
    }
  }

  const doctor = doctors[doctorName];

  // Check if the doctor has available slots
  if (doctor.appointments.length >= doctor.slotsAvailable) {
    return res
      .status(409)
      .send({ error: "No available slots for this doctor" });
  }

  // Validate time slot availability
  if (!isTimeSlotAvailable(doctorName, timeSlot)) {
    return res.status(409).json({ error: "Time slot already booked" });
  }

  let appointmentId = generateAppointmentId(doctorName);

  const newAppointment = {
    _id: uuidv4(),
    appointmentId,
    firstName,
    lastName,
    email,
    timeSlot,
    doctorName,
  };
  addAppointment(newAppointment);
  res.status(201).json(newAppointment);
};

//

const viewAppointment = (req, res) => {
  const { email } = req.params;

  const appointment = getAppointments().filter((appt) => appt.email === email);

  if (!appointment || appointment.length === 0) {
    return res
      .status(404)
      .json({ error: "No appointment found for this email." });
  }

  res.status(200).json(appointment);
};

const viewAppointmentsByDoctor = (req, res) => {
  const { doctorName } = req.params;

  const appointments = findAppointmentsByDoctor(doctorName);

  if (appointments.length === 0) {
    return res
      .status(404)
      .json({ error: "No appointments found for this doctor." });
  }

  res.status(200).json(appointments);
};

const cancelAppointment = (req, res) => {
  const { email, timeSlot } = req.body;

  const appointment = getAppointments().filter(
    (appt) => appt.email === email && appt.timeSlot === timeSlot
  );

  let ret = 0;
  if (appointment.length == 0) {
    return res.status(404).json({ error: "No appointment found to cancel." });
  }

  ret = deleteAppointment(email, timeSlot, appointment);
  if (!ret)
    return res.status(404).json({ error: "No appointment found to cancel." });
  res.status(200).json({ message: "Appointment cancelled successfully." });
};

const modifyAppointment = (req, res) => {
  const { email, originalTimeSlot, newTimeSlot } = req.body;

  const updatedAppointment = modifyAppointmentData(
    email,
    originalTimeSlot,
    newTimeSlot
  );

  if (updatedAppointment.length == 0) {
    return res.status(404).json({ error: "No appointment found to modify." });
  }

  res.status(200).json(updatedAppointment);
};

module.exports = {
  bookAppointment,
  viewAppointment,
  viewAppointmentsByDoctor,
  cancelAppointment,
  modifyAppointment,
};
