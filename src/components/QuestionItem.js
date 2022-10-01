import React from "react";

function QuestionItem({ question, onDeleteClick, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleCorrectIndexChange(e) {

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": e.target.value,
      }),
      })
      .then(r => r.json())
      .then(updatedQuestion => onUpdateQuestion(updatedQuestion))
 
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectIndexChange}>{options}</select>
      </label>
      <button onClick={() => onDeleteClick(question)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
