import logo from './logo.svg';
import {useEffect} from "react";

import './App.css';
import Logic15 from "./day15/logic15";

/**
 * .."""....."""
 * ."...."."...."
 * ."....."....."
 * .."........."
 * ..."......."
 * ....."..."
 * ......."
 *
 * https://adventofcode.com/2022
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  if (window.REACT_START === 0) {
    window.REACT_START += 1;
    return (<div className="App"/>);
  }

  Logic20();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Max calorie of Elf: ????
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
