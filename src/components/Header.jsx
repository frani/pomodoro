import React, { Component } from 'react';
import isotipo from '../images/isotipo.svg';
import logotipo from '../images/logtipo.svg';

export default class Header extends Component {
    render() {
        let { rotating } = this.props;
        return (
            <div className="dp100">
                <div className="container">
                    <header className="text-centered">
                        {/* <h1 className="color-primary" style={{ "fontWeight": "500" }}> Pomodoro<span className="color-secundary">.</span>Tech<span className="color-secundary">nique</span></h1> */}
                        <img style={{"height":"80px","marginTop":"20px", "transition":"30s"}} className={rotating ? 'rotate' : 'rotate paused' } src={isotipo} alt="pomodoro technique"/>
                        <img style={{"height":"80px","marginTop":"20px"}} src={logotipo} alt="pomodoro technique"/>
                    </header>
                </div>
            </div>
        )
    }
}
