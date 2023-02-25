import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


function Form(props) {
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const reset = function () {
        setStudent("")
        setInterviewer(null)
    }
    const cancel = function () {
        props.onCancel()
        reset()
    }
    return (
    
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
                    <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        onSubmit={event => event.preventDefault()}
      />
    </form>
                <InterviewerList 
                    value={interviewer}
                    onChange={setInterviewer}
                    interviewers={props.interviewers}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger >Cancel</Button>
      <Button onClick={props.onSave} confirm >Save</Button>
    </section>
  </section>
</main>

)

}


export default Form;


