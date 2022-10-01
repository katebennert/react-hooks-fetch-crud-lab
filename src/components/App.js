import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionItems, setQuestionItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(questions => setQuestionItems(questions))
  }, [])

  function handleNewQuestionSubmit(newQuestion) {
    setQuestionItems([...questionItems, newQuestion])
  }

  function handleDeleteClick(question) {
    fetch(`http://localhost:4000/questions/${question.id}`,
      {method: 'DELETE'}
      )
      .then(r => r.json())
      .then(() => setQuestionItems(questionItems.filter(q => q.id !== question.id)))
  }

  function onUpdateQuestion(updatedQuestion){
    setQuestionItems(questionItems.map(q => {
      if (q.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return q;
      }
    }))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestionSubmit={handleNewQuestionSubmit}/> : <QuestionList questionItems={questionItems} onDeleteClick={handleDeleteClick} onUpdateQuestion={onUpdateQuestion}/>}
    </main>
  );
}

export default App;
