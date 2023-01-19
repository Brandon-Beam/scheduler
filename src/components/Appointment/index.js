import "components/Appointment/styles.scss"
import React, { Fragment } from "react"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import { action } from "@storybook/addon-actions"




export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function remove(id) {
    transition(SAVING, true)
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment"><Header time={props.time} />
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props?.interview?.student || ""}
            name={props?.interview?.interviewer?.name || ""}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save} />
        )}
        {mode === SAVING && <Status />}
        {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)} onConfirm={() => remove(props.id)} message={'are you sure?'} />}
        {mode === EDIT && <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save} />}
        {mode === ERROR_SAVE && <Error message={"failed to save"} onClose={() => back()} />}
        {mode === ERROR_DELETE && <Error message={"failed to delete"} onClose={() => transition(SHOW)} />}
      </Fragment>
    </article>
  )
}