import './index.scss';
import { useState } from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

const Result = ({ onClickReset, correctAnswerCount, numderOfQuestions }) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt='qwerty'/>
      <h2>{`Вы отгадали ${correctAnswerCount} ответа из ${numderOfQuestions}`}</h2>
      <button onClick={() => onClickReset()} >Попробовать снова</button>
    </div>
  );
}

const Game = ({question, onClickVariant, progressBar}) => {
  return (
    <>
      <div className="progress">
        <div style={{ width: `${progressBar}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((variant, index) => 
            <li onClick={() => onClickVariant(index)} key={index}>{variant}</li>)
        }
      </ul>
    </>
  );
}

function App() {

  const numderOfQuestions = questions.length
  const progressBarIncrement = 100 / numderOfQuestions;

  const [step, setStep] = useState(0);
  const [correctAnswerCount, setCorrectAnswer] = useState(0);
  const [progressBar, setProgressBar] = useState(progressBarIncrement)
  const question = questions[step];  
  
  const onClickVariant = (index) => {
    if(step < numderOfQuestions){
      setStep(step + 1);
      setProgressBar(progressBar + progressBarIncrement);
    }
    if (index === question.correct){
      setCorrectAnswer(correctAnswerCount + 1)
    }
  }

  const onClickReset = () => {
    setStep(0);
    setCorrectAnswer(0);
    setProgressBar(progressBarIncrement);
  }

  return (
    <div className="App">
      { step === questions.length
        ? <Result onClickReset={onClickReset} correctAnswerCount={correctAnswerCount} numderOfQuestions={numderOfQuestions}/>
        : <Game question={question} onClickVariant={onClickVariant} progressBar={progressBar}/>
      }
   </div>
  );
}

export default App;
