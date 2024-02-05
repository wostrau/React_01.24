import React, { useState } from 'react'

import './App.css'
import { AppHeader } from './components/AppHeader'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { QuizScreen } from './screens/QuizScreen'
import { QUESTIONS } from './mock_data/questions'

function App() {
  const [quizSettings, setQuizSettings] = useState(null)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  console.log(selectedAnswers)

  const handleStartQuiz = (settings) => {
    setQuizSettings(settings)

    const shuffledQuestions = QUESTIONS.sort(() => Math.random() - 0.5)
    // .slice(0, settings.quantity - 1)
    setSelectedQuestions(shuffledQuestions)
  }

  const handleEndQuiz = (answers) => {
    setSelectedAnswers(answers)
  }

  return (
    <>
      <AppHeader />
      <div id="screens">
        {quizSettings ? (
          <QuizScreen onEndQuiz={handleEndQuiz} questions={selectedQuestions} {...quizSettings} />
        ) : (
          <WelcomeScreen onStartQuiz={handleStartQuiz} />
        )}
      </div>
    </>
  )
}

export default App
