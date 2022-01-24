import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

const Appointment = (props) => {

  const { mode, transition, back, history } = useVisualMode(
    // Initial state argument
    props.interview ? SHOW : EMPTY
  );

   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function cancel() {
    transition(SAVING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status 
          message={history.slice(-2)[0] === "EMPTY" ? "Saving..." : "Deleting..."}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()}
          onConfirm={cancel}
          message={"Are you sure you would like to delete?"}
        />
      )}

    </article>
  )
};

export default Appointment;
