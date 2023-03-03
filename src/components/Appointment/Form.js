import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// The Form component uses state to manage input fields and errors, validates user input, and renders a form with an InterviewerList and Button components for saving and cancelling the form.

function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Validate checks if the student name or interviewer is missing, sets the error message if so, otherwise clears any existing error and saves the appointment.

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");

      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");

      return;
    }

    setError("");

    props.onSave(student, interviewer);
  }

  // Resets the student and interviewer state values to their defaults.

  const reset = function () {
    setStudent("");
    setInterviewer(null);
  };

  // Calls props.onCancel(), resets the form using reset(), and clears any existing errors.

  const cancel = function () {
    props.onCancel();
    reset();
    setError("");
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />

          <section className="appointment__validation">{error}</section>
        </form>

        <InterviewerList
          value={interviewer}
          onChange={setInterviewer}
          interviewers={props.interviewers}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button
            onClick={() => {
              validate();
            }}
            confirm
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
