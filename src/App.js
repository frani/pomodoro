import React from 'react';
import './main.css';

import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <Timer />
      <footer className="text-centered" style={{"marginTop": "5rem"}}>
        <a className="text-light" href="https://en.wikipedia.org/wiki/Pomodoro_Technique" rel="noopener noreferrer" target="_blank"><p><em>¿Why Pomodoro Technique?</em></p></a>
        <p style={{"color":"white"}}>Hecho con <span className="heart"></span> por <a className="text-warning" href="https://roarstudio.org" rel="noopener noreferrer" target="_blank">RoaR</a></p>
      </footer>
    </div>
  );
}

export default App;
