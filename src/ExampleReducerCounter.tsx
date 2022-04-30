import { useState, useReducer } from 'react'
import './App.css'

function reducer() {

}


function App() {

  const [count, setCount] = useState(0)

  function increment() {
    setCount(prevCount => prevCount + 1);
  }

  function decrement() {
    setCount(prevCount => prevCount - 1);
  }

  return (
    <div>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
    </div>
  )
}

export default App
