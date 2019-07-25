import React, { Component } from 'react';
import isotipo from '../images/isotipo.svg';
import logotipo from '../images/logtipo.svg';

export default class Header extends Component {
    render() {
        let { rotating } = this.props;
        return (
                <div className="container">
                    <header className="text-centered">
                        {/* <h1 className="color-primary" style={{ "fontWeight": "500" }}> Pomodoro<span className="color-secundary">.</span>Tech<span className="color-secundary">nique</span></h1> */}
                        <img className={rotating ? 'headerLogo rotate' : 'headerLogo rotate paused' } src={isotipo} alt="pomodoro technique"/>
                        <img style={{"marginLeft":"10px"}} className="headerLogo" src={logotipo} alt="pomodoro technique"/>
                    </header>
                </div>
        )
    }
}
