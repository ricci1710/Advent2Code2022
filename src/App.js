import logo from './logo.svg';
import {useEffect} from "react";

import './App.css';
import Logic10 from "./day10/logic10";

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
  useEffect(() => {
    Logic10();
  }, []);


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
