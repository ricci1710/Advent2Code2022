import logo from './logo.svg';
import './App.css';
import Logic01 from './day01/logic01';
import Logic02 from './day02/logic02';
import Logic03 from "./day03/logic03";

function App() {
  Logic03();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
