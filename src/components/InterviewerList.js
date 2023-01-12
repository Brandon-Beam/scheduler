import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const Interviewers = props.interviewers.map((interviewer) => <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={() => props.onChange(interviewer.id)}
  />)

  return (
    <section>interviewer
      <ul className="interviewers__list">
        {Interviewers}
      </ul></section>
  )
}