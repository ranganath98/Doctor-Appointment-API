# Doctor Appointment Booking System

## Overview

This is a Doctor appointment API that allows users (patients) to book, view, cancel, and modify appointments with predefined doctors. The appointment system stores data in memory (no database).

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/doctor_appointment_app.git
   cd doctor_appointment_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. To run the server:

   ```bash
   npm start
   ```

4. To run tests:
   ```bash
   npm test
   ```

## API Endpoints

- `POST /api/appointments/book` - Book an appointment
- `GET /api/appointments/view/:email` - Get appointment details for a patient
- `GET /api/appointments/doctor/:doctorName` - Get all appointments for a specific doctor
- `DELETE /api/appointments/cancel` - Cancel an appointment
- `PUT /api/appointments/modify` - Modify an appointment

## Tests

Tests are written using Mocha and Chai with Chai HTTP for API testing.

- To run the tests, use the following command:
  ```bash
  npm test
  ```

---
