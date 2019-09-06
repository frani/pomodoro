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
    } else {
      document.body.style.backgroundColor = "#860e0c";
    }
  }

  handleChange = () => {
    if(this.state.checked) {
      localStorage.setItem('pomodoro-tech-theme', 'false');
      this.setState({ checked: false});
      document.body.style.backgroundColor = "#860e0c";
    } else {
      localStorage.setItem('pomodoro-tech-theme', 'true');
      this.setState({ checked: true });
      document.body.style.backgroundColor = "#1c1c1c";
    }
  }
  render() {
    let { checked } = this.state;
    return (
      <div className={ checked ? "App black-theme" : "App red-theme"}>
      <Timer />
      
      <footer className="text-centered" style={{"marginTop": "5rem"}}>
        <label htmlFor="material-switch">
          <Switch
            checked={checked}
            onChange={this.handleChange}
            onColor="#ab0f0c"
            onHandleColor="#860e0c"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </label>
        <a className="text-light" href="https://en.wikipedia.org/wiki/Pomodoro_Technique" rel="noopener noreferrer" target="_blank"><p><em>¿Why Pomodoro Technique?</em></p></a>
        <p style={{"color":"white"}}>Hecho con <span className="heart"></span> por <a className="text-warning" href="https://roarstudio.org" rel="noopener noreferrer" target="_blank">RoaR</a></p>
      </footer>
    </div>
    )
  }
};
