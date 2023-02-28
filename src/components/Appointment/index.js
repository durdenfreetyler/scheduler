import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
// import { create } from "react-test-renderer";
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
  // console.log("mode", mode);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("name", name, "interviewer", interviewer);
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

  function showDeleteConfirmation() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
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
      {mode === SAVING && <Status message="Saving!" />}
      {mode === DELETING && <Status message="Deleting!" />}
      {mode === CONFIRM && (
        <Confirm onCancel={() => transition(SHOW)} onConfirm={confirmDelete} />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message="Error occurred while saving" />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message="Error occurred while deleting" />
      )}
    </article>
  );
}
