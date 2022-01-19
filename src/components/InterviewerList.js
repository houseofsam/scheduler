import React from 'react';
import './InterviewerList.scss';
import './InterviewerListItem';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {
  const { interviewers, setInterviewer, interviewer } = props;

  const interviewerListItems = interviewers.map((interviewerItem) => (
    <InterviewerListItem 
      key={interviewerItem.id}
      id={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewer === interviewerItem.id}
      setInterviewer={setInterviewer}
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
