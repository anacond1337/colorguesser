import { useEffect, useState } from 'react'
import "./App.css"

const getRandomColor = () => {
  const digits = [
    '0',
    '1',
    '2',
    '3', 
    '4', 
    '5', 
    '6', 
    '7', 
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
  ]

  const color =  new Array(6)
    .fill('')
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("")

    return `#${color}`
}

enum Result {
  Correct,
  Wrong
}

function App() {

  const [color, setColor] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [isWrongSelection, setIsWrongSelection] = useState<Result | undefined>(undefined)

  const pickColor = () => {
      const actualColor = getRandomColor()
      setColor(actualColor)
      setAnswers(
        [actualColor, getRandomColor(), getRandomColor()].sort(
          () => 0.5 - Math.random()
        )
      )
    }

  useEffect(() => {
    pickColor()
  }, [])

  const handleAnswerClicked = (answer: string):void => {
    if (answer === color) {
      setIsWrongSelection(Result.Correct)
      pickColor()
    } else {
      setIsWrongSelection(Result.Wrong)
    }
  }

  return (
    <div className="App">
      <div>
        <div className="guess-me" style={{background: color}}></div>

        {answers.map((answer) => (
          <button
            onClick={() => handleAnswerClicked(answer)} key={answer}>
            {answer}
          </button>
        ))}

        {isWrongSelection === Result.Wrong && <div className='wrong'>Wrong Answer</div>}
        {isWrongSelection === Result.Correct && <div className='correct'>Correct Answer</div>}
      </div>
    </div>
  )
}

export default App