import React from "react";
import QuestionItem from './QuestionItem'

function QuestionList({ questionItems, onDeleteClick, onUpdateQuestion }) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems.map(questionItem => {
            return <QuestionItem question={questionItem} key={questionItem.id} onDeleteClick={onDeleteClick} questionItems={questionItems} onUpdateQuestion={onUpdateQuestion}/>
            })
          }
      </ul>
    </section>
  );
}

export default QuestionList;
