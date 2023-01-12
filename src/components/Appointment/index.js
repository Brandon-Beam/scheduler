import "components/Appointment/styles.scss"
import React, { Fragment } from "react"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"



export default function Appointment(props) {
  return (
    <article className="appointment"><Header time={props.time} />
      <Fragment>
        {props.interview ?
          <Show student={props.interview.student} name={props.interview.interviewer.name} />
          :
          <Empty />}
      </Fragment>
    </article>
  )
}