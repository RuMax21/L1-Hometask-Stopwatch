import { useState } from 'react';
import './styles/App.css';
import SingleStopwatch from './components/SingleStopwatch';

function App() {
  const [stopwatches, setStopwatches] = useState<number[]>([]);

  const addStopwatch = () => {
    const id = Date.now();
    setStopwatches(prev => [...prev, id]);
  }

  const removeStopwatch = (id: number) => {
    setStopwatches(prev => prev.filter((stopwatch) => stopwatch !== id));
  }

  return (
    <>
      <h1>Stopwatch</h1>

      {stopwatches.length !== 0 
        ? stopwatches.map((stopwatch) => (
          <SingleStopwatch
            key={stopwatch}
            onRemove={() => removeStopwatch(stopwatch)}
          />
        )) 
        : <p style={{ color: 'gray' }}>
          The stopwatch has not been added yet.
        </p> 
      }

      <button style={{margin: "20px"}} onClick={addStopwatch}>+stopwatch</button>
    </>
  )
}

export default App
