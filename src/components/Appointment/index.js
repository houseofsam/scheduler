import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const PROCESSING = "PROCESSING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

    transition(PROCESSING);

    // props.id is the appointment ID
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // cancel appointment
  function cancel() {
    transition(PROCESSING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
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
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === PROCESSING && (
        <Status 
          message={
            history.slice(-2)[0] === "CREATE" || history.slice(-2)[0] === "EDIT"
              ? "Saving..." 
              : "Deleting..."
          }
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={back}
          onConfirm={cancel}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={"Could not cancel appointment"}
          onClose={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message={"Could not save appointment"}
          onClose={back}
        />
      )}

    </article>
  )
};

export default Appointment;
