import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TimeTracker from './components/TimeTracker';
import Navigationbar from './components/navbar/Navigationbar';
import { useState } from 'react';

function App() {

  const [totalTaskTime, setTotalTaskTime] = useState(0)

  return (
    <div className="App">
      <Navigationbar totalTaskTime={totalTaskTime} />

      <TimeTracker setTotalTaskTime={setTotalTaskTime} />
    </div>
  );
}

export default App;
