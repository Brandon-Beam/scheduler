import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const Interviewers = props.interviewers.map((Interviewer) => <InterviewerListItem key={Interviewer.id} id={Interviewer.id} name={Interviewer.name} avatar={Interviewer.avatar} selected={props.interviewer === Interviewer.id} setInterviewer={props.setInterviewer} />)
  return (
    <ul>
      {Interviewers}
    </ul>
  )
}