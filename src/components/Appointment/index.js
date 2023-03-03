import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  let { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Saves a new interview object with the given name and interviewer, transitions to "SAVING" mode, calls props.bookInterview to book the new interview, and transitions to "SHOW" mode upon success or "ERROR_SAVE" mode upon failure.

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  // Transitions to "DELETING" mode, calls props.cancelInterview to cancel the interview associated with the appointment, and transitions to "EMPTY" mode upon success or "ERROR_DELETE" mode upon failure.

  function confirmDelete() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)

      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  //  Transitions to "CONFIRM" mode to show a confirmation dialog for deleting the appointment.

  function showDeleteConfirmation() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={showDeleteConfirmation}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={confirmDelete}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          onClose={back}
          message="Could not save appointment. Please try again later."
        />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message="Error occurred while deleting" />
      )}
    </article>
  );
}
