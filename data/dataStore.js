const appointments = [];
// Predefined doctors with a slot limit (e.g., 5 slots per doctor)
const doctors = {
  "Dr. Smith": { slotsAvailable: 5, appointments: [] },
  "Dr. Adams": { slotsAvailable: 5, appointments: [] },
  "Dr. Johnson": { slotsAvailable: 5, appointments: [] },
};

// Helper functions

function isValidDoctor(doctorName) {
  return doctors[doctorName];
}

function isTimeSlotAvailable(doctorName, timeSlot) {
  const doctorAppointments = doctors[doctorName].appointments;
  const existingAppointment = doctorAppointments.find(
    (appt) => appt.timeSlot === timeSlot
  );

  return !existingAppointment;
}

function generateAppointmentId(doctorName) {
  return (doctors[doctorName].appointments.length + 1).toString();
}

function clearAppointments() {
  for (let doctor in doctors) {
    doctors[doctor].appointments = [];
  }
}

const addAppointment = (appointment) => {
  doctors[appointment.doctorName].appointments.push(appointment);
  return appointment;
};

const getAppointments = () => {
  const appointments = [];

  for (let doctor in doctors) {
    if (doctors[doctor].appointments.length > 0) {
      doctors[doctor].appointments.map((appointment) => {
        if (appointment) appointments.push(appointment);
      });
    }
  }

  return appointments;
};

const findAppointment = (email, timeSlot) => {
  const doctorAppointments = doctors[doctorName].appointments;
  return doctorAppointments.find(
    (appt) => appt.email === email && appt.timeSlot === timeSlot
  );
};

const findAppointmentsByDoctor = (doctorName) =>
  doctors[doctorName].appointments;

const deleteAppointment = (email, timeSlot, appointment) => {
  let res = 0;

  if (appointment.length > 0) {
    const doctorName = appointment[0].doctorName;

    const index = appointment.findIndex(
      (appt) => appt.email === email && appt.timeSlot === timeSlot
    );
    if (index !== -1) {
      appointment.splice(index, 1);
      if (appointment.length == 0) {
        doctors[doctorName].appointments = [];
      } else {
        doctors[doctorName].appointments = appointment;
      }

      res = 1;
    }
  }

  return res;
};

const modifyAppointmentData = (email, originalTimeSlot, newTimeSlot) => {
  const appointment = getAppointments().filter(
    (appt) => appt.email === email && appt.timeSlot === originalTimeSlot
  );

  if (appointment.length > 0) {
    doctors[appointment[0].doctorName].appointments[0].timeSlot = newTimeSlot;
  }
  return appointment;
};

module.exports = {
  isValidDoctor,
  isTimeSlotAvailable,
  generateAppointmentId,
  doctors,
  clearAppointments,

  addAppointment,
  getAppointments,
  findAppointment,
  findAppointmentsByDoctor,
  deleteAppointment,
  modifyAppointmentData,
};
