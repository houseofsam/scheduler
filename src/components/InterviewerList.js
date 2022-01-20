import React from 'react';
import './InterviewerList.scss';
import './InterviewerListItem';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {
  const { interviewers, onChange, value } = props;

  const interviewerListItems = interviewers.map((interviewer) => (
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={value === interviewer.id}
      setInterviewer={() => onChange(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  )
}

export default InterviewerList
