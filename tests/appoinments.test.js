const chai = require("chai"); // assertion framework
const chaiHttp = require("chai-http"); // HTTP Request Handling
const app = require("../app");

const clearAppointments = require("../data/dataStore").clearAppointments;

const { expect } = chai;

chai.use(chaiHttp);

beforeEach((done) => {
  clearAppointments();
  done(); // Call done() to proceed with the next test
});

describe("Doctor Appointment API", () => {
  it("should successfully book an appointment", (done) => {
    chai
      .request(app)
      .post("/api/appointments/book")
      .send({
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. Smith",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("appointmentId");
        done();
      });
  });

  it("should not allow booking a time slot that is already taken", (done) => {
    // First appointment booking
    chai
      .request(app)
      .post("/api/appointments/book")
      .send({
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. Smith",
      })
      .end(() => {
        // Attempt to book the same time slot
        chai
          .request(app)
          .post("/api/appointments/book")
          .send({
            firstName: "Bob",
            lastName: "Brown",
            email: "bob.brown@example.com",
            timeSlot: "10:00 AM - 11:00 AM",
            doctorName: "Dr. Smith",
          })
          .end((err, res) => {
            console.log(res.body.error);
            expect(res).to.have.status(409);
            expect(res.body.error).to.equal("Time slot already booked");
            done();
          });
      });
  });

  it("should cancel an appointment successfully", (done) => {
    // Assume an appointment is already booked

    chai
      .request(app)
      .post("/api/appointments/book")
      .send({
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. Smith",
      })
      .end(() => {
        chai
          .request(app)
          .delete("/api/appointments/cancel")
          .send({
            email: "alice.johnson@example.com",
            timeSlot: "10:00 AM - 11:00 AM",
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal(
              "Appointment cancelled successfully."
            );
            done();
          });
      });
  });
});
