import React, { Component } from 'react';
import Switch from 'react-switch';
import './main.css';

import Timer from './components/Timer';

export default class App extends Component {
  state = {
    checked: false,
  }
  

  componentDidMount() {
    if(localStorage.getItem('pomodoro-tech-theme') === 'true') {
      this.setState({ checked: true });
      document.body.style.backgroundColor = "#1c1c1c";
      document.getElementById('theme-color').content = "#1c1c1c";
    } else {
      document.body.style.backgroundColor = "#860e0c";
      document.getElementById('theme-color').content = "#860e0c";
    }
  }
  
  handleChange = () => {
    if(this.state.checked) {
      localStorage.setItem('pomodoro-tech-theme', 'false');
      this.setState({ checked: false});
      document.body.style.backgroundColor = "#860e0c";
      document.getElementById('theme-color').content = "#860e0c";
    } else {
      localStorage.setItem('pomodoro-tech-theme', 'true');
      this.setState({ checked: true });
      document.body.style.backgroundColor = "#1c1c1c";
      document.getElementById('theme-color').content = "#1c1c1c";
    }
  }
  render() {
    let { checked } = this.state;
    return (
      <div className={ checked ? "App black-theme" : "App red-theme"}>
      <Timer />
      
      <footer className="text-centered" style={{"marginTop": "5rem"}}>
        <span style={{"color":"white","fontSize":"32px","fontWeight": "400"}}> Dark Mode </span>
        <label htmlFor="material-switch">
          <Switch
            checked={checked}
            onChange={this.handleChange}
            onColor="#ab0f0c"
            offColor="#1c1c1c"
            onHandleColor="#fff"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
            height={26}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </label>
        <a className="text-warning" href="https://en.wikipedia.org/wiki/Pomodoro_Technique" rel="noopener noreferrer" target="_blank"><p><em>¿Why Pomodoro Technique?</em></p></a>
        <p style={{"color":"white"}}><svg height="20" class="octicon octicon-code v-align-middle mr-1" aria-label="code" fill="currentColor"
          viewBox="0 0 14 16" version="1.1" width="17" role="img">
          <path d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path>
        </svg> with <span className="heart"></span> by <a className="text-warning" href="https://frani.me" rel="noopener noreferrer" target="_blank">Frani</a></p>
      </footer>
    </div>
    )
  }
};
